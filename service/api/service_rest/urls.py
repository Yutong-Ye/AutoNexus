from django.urls import path, include
from .views import technician_list, technician_detail, appointment_list, appointment_detail


urlpatterns = [
    path("technicians/", technician_list, name="technician_list"),
    path("technicians/<int:id>/", technician_detail, name="technician_detail"),
    path("appointments/", appointment_list, name="appointment_list"),
    path("appointments/<int:id>/", appointment_detail, name="appointment_detail"),
    
]