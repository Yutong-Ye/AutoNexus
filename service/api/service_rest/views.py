from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from .models import Technician, Appointment, AutomobileVO
from django.http import JsonResponse
from common.json import ModelEncoder
import json


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "vin",
        "vip",
        "date_time",
        "customer",
        "service_reason",
        "status",
    ]
    def get_extra_data(self, o):
        return {
            "techname": o.technician.first_name + " " + o.technician.last_name,
            }



@require_http_methods(["GET", "POST"])
def technician_list(request):
    if request.method == "GET":
        techs = Technician.objects.all()
        return JsonResponse(
            {"techs": techs},
            encoder=TechnicianEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            tech = Technician.objects.create(**content)
            return JsonResponse(
            tech,
            encoder=TechnicianEncoder,
            safe=False,
        )
        except:
            return JsonResponse(
                {"message": "Could Not Create Technician"},
                status=400,
            )


@require_http_methods(["DELETE", "GET", "PUT"])
def technician_detail(request, id):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=id)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            count, _ = Technician.objects.filter(id=id).delete()
            return JsonResponse({"deleted": count > 0})
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})


@require_http_methods(["GET", "POST"])
def appointment_list(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
        )
    elif request.method == "POST":
        try:
            content = json.loads(request.body)
            vin = content['vin']
            if AutomobileVO.objects.filter(vin=vin).exists():
                content['vip'] = True
            else:
                content['vip'] = False
            technician_id = content["technician"]
            technician = Technician.objects.get(id=technician_id)
            content["technician"] = technician
            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except ValueError:
            return JsonResponse(
                {"message": "Could Not Create Appointment"},
                status=400,
            )


@require_http_methods(["DELETE", "GET", "PUT"])
def appointment_detail(request, id):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=id)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            count, _ = Appointment.objects.filter(id=id).delete()
            return JsonResponse({"deleted": count > 0})
        except Appointment.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    elif request.method == "PUT":
        try:
            appointment = Appointment.objects.get(id=id)
            content = json.loads(request.body)
            appointment.status = content.get("status", appointment.status)
            appointment.save()
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
