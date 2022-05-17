import urllib3
from flask import Flask, request
import requests
import json

app = Flask(__name__)


@app.route("/accestoken", methods=["POST"])
def accesToken():
    if request.method == "POST":
        print(request.get_json()["data"])
        URL = "https://www.strava.com/oauth/token"
        PARAMS = {
            "client_id": "74263",
            "client_secret": "de95dd8ef27c44d1c6f385779f381ec75e92fb8b",
            "code": request.get_json()["data"],
            "grant_type": "authorization_code",


        }
        resp = requests.post(URL, data=PARAMS, verify=False)
        accessToken = ""
        expires_at = ""
        if(resp):
            accessToken = resp.json()["access_token"]
            expires_at = resp.json()["expires_at"]
            print(accessToken)
        else:
            accessToken = "invalid"
        # code = request.get_json()["data"]
        # url = f"www.strava.com/api/v3/oauth/token?client_id=74263&client_secret=de95dd8ef27c44d1c6f385779f381ec75e92fb8b&code=2a992710a64ec3eef1834125005b83533506ad55&grant_type=authorization_code"
        # response = requests.post(url)
        # quote = response.json()

        return {"accesToken": accessToken, "expires_at": expires_at}


@app.route("/refreshtoken", methods=["POST"])
def refershToken():
    if request.method == "POST":
        # print(request.get_json()["data"])
        URL = "https://www.strava.com/oauth/token"
        PARAMS = {
            "client_id": "74263",
            "client_secret": "de95dd8ef27c44d1c6f385779f381ec75e92fb8b",
            "code": request.get_json()["data"],
            "grant_type": "refresh_token",


        }
        resp = requests.post(URL, data=PARAMS, verify=False)
        accessToken = ""
        expires_at = ""
        if(resp):
            accessToken = resp.json()["access_token"]
            expires_at = resp.json()["expires_at"]
            print(accessToken)
        else:
            accessToken = "invalid"
        # code = request.get_json()["data"]
        # url = f"www.strava.com/api/v3/oauth/token?client_id=74263&client_secret=de95dd8ef27c44d1c6f385779f381ec75e92fb8b&code=2a992710a64ec3eef1834125005b83533506ad55&grant_type=authorization_code"
        # response = requests.post(url)
        # quote = response.json()

        return {"accesToken": accessToken, "expires_at": expires_at}


@app.route("/listactivities", methods=["POST"])
def listActivities():
    if request.method == "POST":
        # print(request.get_json()["data"])
        URL = "https://www.strava.com/api/v3/athlete/activities"
        PARAMS = {
            "page": 1,
            "per_page": 40
        }
        HEADERS = {
            "Authorization": "Bearer " + request.get_json()["data"],



        }
        resp = requests.get(URL, params=PARAMS, headers=HEADERS, verify=False)
        resData = []
        if(resp):
            resData = resp.json()
            # print(resData)
        # code = request.get_json()["data"]
        # url = f"www.strava.com/api/v3/oauth/token?client_id=74263&client_secret=de95dd8ef27c44d1c6f385779f381ec75e92fb8b&code=2a992710a64ec3eef1834125005b83533506ad55&grant_type=authorization_code"
        # response = requests.post(url)
        # quote = response.json()

        return {"data": resData}


@app.route("/getauthathlete", methods=["POST"])
def getauthAthlete():
    # print(request.get_json()["data"])
    URL = "https://www.strava.com/api/v3/athlete"

    HEADERS = {
        "Authorization": "Bearer " + request.get_json()["data"],



    }
    resp = requests.get(URL, headers=HEADERS, verify=False)
    resData = []
    if(resp):
        resData = resp.json()
        # print(resData)
        # code = request.get_json()["data"]
        # url = f"www.strava.com/api/v3/oauth/token?client_id=74263&client_secret=de95dd8ef27c44d1c6f385779f381ec75e92fb8b&code=2a992710a64ec3eef1834125005b83533506ad55&grant_type=authorization_code"
        # response = requests.post(url)
        # quote = response.json()

    return {"data": resData}


@app.route("/getactivity", methods=["POST"])
def getActivity():
    if request.method == "POST":
        id = request.get_json()["id"]
        URL = f"https://www.strava.com/api/v3/activities/{id}"

        PARAMS = {
            "include_all_efforts": True,

        }
        HEADERS = {
            "Authorization": "Bearer " + request.get_json()["token"],



        }
        resp = requests.get(URL, params=PARAMS, headers=HEADERS, verify=False)
        resData = []
        if(resp):
            resData = resp.json()
            # print(resData)
        # code = request.get_json()["data"]
        # url = f"www.strava.com/api/v3/oauth/token?client_id=74263&client_secret=de95dd8ef27c44d1c6f385779f381ec75e92fb8b&code=2a992710a64ec3eef1834125005b83533506ad55&grant_type=authorization_code"
        # response = requests.post(url)
        # quote = response.json()

        return {"data": resData}


if __name__ == "__main__":
    app.run(debug=True)
