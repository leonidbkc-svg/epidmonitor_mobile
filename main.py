from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pywebpush import webpush
import json

app = FastAPI()

subscriptions = []

templates = Jinja2Templates(directory="templates")

app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/")
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.post("/subscribe")
async def subscribe(data: dict):

    subscriptions.append(data)

    print("NEW SUBSCRIPTION:")
    print(data)

    return {"status": "subscribed"}


@app.get("/send-test")
async def send_test():

    for sub in subscriptions:

        webpush(
            subscription_info=sub,
            data=json.dumps({
                "title": "EpidMonitor",
                "body": "Тестовое уведомление системы"
            }),
            vapid_private_key="/root/epidmonitor_mobile/private_key.pem",
            vapid_claims={
                "sub": "mailto:admin@epid-test.ru"
            }
        )

    return {"sent": True}