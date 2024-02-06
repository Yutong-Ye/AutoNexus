import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

from sales_rest.models import AutomobileVO

def get_automobiles():
    response = requests.get("http://project-beta-inventory-api-1:8000/api/automobiles/")
    content = json.loads(response.content)
    print(content)
    for automobile in content["automobiles"]:
        AutomobileVO.objects.update_or_create(
            vin = automobile["vin"],
            sold = automobile["sold"]
        )
        print(response.status_code)

def poll():
    while True:
        print('Sales poller polling for data')
        try:
            get_automobiles()
        except Exception as e:
            print(e)
        time.sleep(60)


if __name__ == "__main__":
    poll()
