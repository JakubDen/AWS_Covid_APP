from flask import Flask,jsonify
import json
import boto3
import os
import requests
from botocore.exceptions import ClientError

app = Flask(__name__)

areaType='nation'
areaName='england'
areaCode='dsadsa'
date='2021-06-07'

s3_client = boto3.client(service_name='s3')
S3_BUCKET = os.getenv('S3_BUCKET')

@app.route("/",methods=["GET"])
def get_data():
    try:
        data = requests.get("https://api.coronavirus.data.gov.uk/v1/data", params=api_params, timeout=10)
        encoded_data_list=json.loads(data.text).get('data')
        json_string=''
        for row in encoded_data_list:
            encoded_data_row=json.dumps(row) + '\n'
            json_string+=encoded_data_row
        json_string_encoded=json_string.encode('utf-8')
        #s3client=s3_client.put_object(Bucket=S3_BUCKET,Key='Data/data.json',Body=json_string_encoded)
    except ClientError as error:
        raise error
    return json_string_encoded,200

filters = [
    f"areaType={ areaType }",
    #f"areaName={ areaName }",
    #f"date={ date }",
    #f"areaCode={ areaCode }"
]

structure = {

    "date": "date",
    "name": "areaName",
    "type": "areaType",
    "Cases": "newCasesByPublishDate",
    #"cumulativeCases": "cumCasesByPublishDate",
    "DeathsByMonthOfTest": "newDeaths28DaysByPublishDate",
    "firstDose" : "newPeopleVaccinatedFirstDoseByPublishDate",
    "secondDose" : "newPeopleVaccinatedSecondDoseByPublishDate",
    "hospitalCases": "hospitalCases",
    "Tests": "newTestsByPublishDate",
    #"femaleCases":"femaleCases",
    #"completeVaccinated" : "newPeopleVaccinatedCompleteByPublishDate",
    #"maleCases":"maleCases"
}

api_params = {
    "filters": str.join(";", filters),
    "structure": json.dumps(structure, separators=(",", ":"))
}

if __name__=="__main__":
    app.run(debug=True)