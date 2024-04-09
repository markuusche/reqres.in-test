import requests
import pytest
import yaml
import random
from faker import Faker
fake = Faker()

def getData(*endpoints):
    with open('resources/endpoints.yaml', 'r') as keys:
        get = yaml.load(keys, Loader=yaml.FullLoader)
    
    for data in endpoints:
        get = get[data]
    
    return get

def request(endpoint, method, params=None, json=None):
    response = getattr(requests, method)
    requestURL = response(getData('base') + endpoint, params=params, json=json)
    return requestURL

def status(response, expected: int):
    assert response.status_code == expected
    
def loginRegister(data, endpoint, expect, json, creds=False):
    params = data
    if not creds:
        params.pop('password')
        
    response = request(getData('user', endpoint), 'post', json=params)
    status(response, expect)
    assert bool(response.json()[json]) == True
    return params