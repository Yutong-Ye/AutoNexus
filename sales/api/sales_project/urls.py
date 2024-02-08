"""sales_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from sales_rest.views import api_list_salespeople, api_list_customers, api_list_sales, api_show_customer, api_show_salesperson, api_show_sale

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/salespeople/", api_list_salespeople, name="api_list_salespeople"),
    path("api/salespeople/<int:pk>/", api_show_salesperson, name="api_show_salesperson"),
    path("api/customers/", api_list_customers, name="api_list_customers"),
    path("api/customers/<int:pk>/", api_show_customer, name="api_show_customer"),
    path("api/sales/", api_list_sales, name="api_list_sales"),
    path("api/sales/<int:pk>/", api_show_sale, name="api_show_sale")
]
