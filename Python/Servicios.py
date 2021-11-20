# -*- coding: utf-8 -*-
"""
Created on Sat Nov 20 00:06:04 2021

@author: Booh
"""

from flask import Flask
from flask import request
from twilio.rest import Client
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import os

#------------------------------------------------------------------------------

app = Flask(__name__)

@app.route("/")
def inicio():
    #prueba = os.environ.get("")
    return "Hello Services"

#------------------------------------------------------------------------------

#Servicio de mensajes de texto con Twilio:
@app.route("/sms")
def envioSMS():
    
    try:
        message=request.args.get("Mensaje")
        phone=request.args.get("Telefono")
        
        account_sid = os.environ['TWILIO_ACCOUNT_SID']
        auth_token = os.environ['TWILIO_AUTH_TOKEN']
        client = Client(account_sid, auth_token)
        
        message = client.messages \
                        .create(
                             body=message,
                             from_='+17153175931',
                             to="+57" + phone
                         )
        
        print(message.sid)
        
        return "Bienvenido al servicio de mensajes de texto"
    
    except Exception as e:
        return "Error enviando el SMS. Error: " + str(e)    
    

#------------------------------------------------------------------------------

#Servicio de envio de correos electronicos con SendGrid:
@app.route("/email")
def envioEmail():
    destination = request.args.get("email")
    issue = request.args.get("subject")
    content = request.args.get("message")
    
    message = Mail(
        from_email=os.environ.get('EMAIL_ORIGEN'),
        to_emails=destination,
        subject=issue,
        html_content=content)
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
        return "Correo enviado con éxito a: " + destination
    except Exception as e:
        print(e.message)
        return "Error enviando el elmail. Error: " + str(e)
        
#------------------------------------------------------------------------------

#Inicio de aplicación:
if __name__ == '__main__':
    app.run()
    
#------------------------------------------------------------------------------