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
from django.db import transaction

def get_automobiles():
    response = requests.get("http://project-beta-inventory-api-1:8000/api/automobiles/")
    response.raise_for_status()
    content = response.json()
    return content.get("autos", [])

def update_automobile(automobile):
    vin = automobile.get("vin")
    sold = automobile.get("sold")

    if vin is not None and sold is not None:
        try:
            with transaction.atomic():
                AutomobileVO.objects.update_or_create(
                    vin=vin,
                    defaults={"sold": sold}
                )
            print(f"Updated AutomobileVO with VIN: {vin}, Sold: {sold}")
        except Exception as e:
            print(f"Error updating AutomobileVO with VIN {vin}: {e}")
    else:
        print(f"Skipping invalid data for AutomobileVO: {automobile}")

def poll():
    while True:
        print('Sales poller polling for data')
        try:
            automobiles = get_automobiles()
            for automobile in automobiles:
                update_automobile(automobile)
        except requests.RequestException as req_exception:
            print(f"Error in API request: {req_exception}")
        except Exception as e:
            print(f"Unexpected error: {e}")
        time.sleep(60)

if __name__ == "__main__":
    poll()
