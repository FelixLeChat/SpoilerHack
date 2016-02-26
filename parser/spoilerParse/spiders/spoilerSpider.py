import scrapy
import re
import json
from scrapy.http import Request

from spoilerParse.items import SpoilerItem

class SpoilerSpider(scrapy.Spider):
    name = "spoiler"
    allowed_domains = ["tvtropes.org"]
    start_urls = [
     'http://tvtropes.org/ajax/browse.api.php'
    ]

    def parse(self, response):
        for page in range(55,68):
            frmdata = '{"has_image": "1","selected_namespaces":["Series"],"selected_genre":[],"selected_media":[],"selected_narrative":[],"selected_topical":[],"page":'+str(page)+',"sort":"A","randomize": "0"}'
            url = 'http://tvtropes.org/ajax/browse.api.php'
            yield Request(url,method='POST',body=frmdata,headers={'Content-Type':"application/json; charset=utf-8"},callback=self.get_pages)

    def get_pages(self, response):
        shows = json.loads(response.body)['results']
        print response.request.body
        for item in shows:
            url = 'http://tvtropes.org/pmwiki/pmwiki.php/' + shows[item]['groupname'] + '/' + shows[item]['title']
            yield Request(url, callback=self.parse_page)

    def parse_page(self, response):
        selector = response.xpath('//div[@class="page-content"]/ul/li') + response.xpath('//div[@class="page-content"]/div[@class="folder"]/ul/li')
        for trope in selector:
            if 'Tropes' in trope.extract():
                url = response.urljoin(trope.css("a::attr('href')").extract()[0])
                yield scrapy.Request(url, callback=self.parse)

        title = response.xpath('//h1[@class="page-title"]/text()').extract()[1][1:].rstrip()
        for sel in selector:
            sel = sel.extract()
            sel = re.sub(r'<a(.*?>)?|<li(.*?>)?|<div(.*?>)?|</div>', '', sel)
            sel = sel.replace('<li>','').replace('</a>','').replace('<ul>','.').replace('</li>','').replace('<br>','').replace('<strong>','').replace('</strong>','').replace('</ul>','').replace('<em>','').replace('</em>','').replace('""','').replace('\\"','')
            for sentence in sel.split(','):
                if len(sentence) < 2:
                    continue
                yield self.parse_item(sentence,title)

    def parse_item(self, sentence, title):
        item = SpoilerItem()
        item['title'] = title
        if '<span class="spoiler"' in sentence:
            item['spoiler'] = True
        else:
            item['spoiler'] = False
        item['sentence'] = re.sub(r'<(.*?>)?','',sentence)[1:]
        if len(item['sentence'].split(' ')) > 1:
            return item
