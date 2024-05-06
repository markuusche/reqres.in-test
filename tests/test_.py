from lib.modules import *

# user requests
def test_userList():
    response = request(getData('user', 'list'), 'get')
    assert response.status_code == 200
    assert len(response.json()['data'][0]) != 0
    return response.json()['data']

def test_singleUser():
    data = test_userList()
    id = []
    for userid in data:
        id.append(userid['id'])

    getId = random.choice(id)
    response = request(getData('user', 'list') + str(getId), 'get')
    status(response, 200)
    assert response.json()['data']['id'] == getId

def test_userNotFound():
    id = str(random.randint(20, 30))
    response = request(getData('user', 'list') + id, 'get')
    status(response, 404)
    assert bool(response.json()) == False

# CRUD
def test_createUser():
    params = {'name': fake.name(), 'job': fake.job()}
    response = request(getData('user', 'list'), 'post', params=params)
    status(response, 201)
    assert bool(response.json()) == True
    return response.json()['id']

def test_updateUser():
    def test_putPatch(method: str):
        return request(getData('user', 'list') + str(id), method, params=params)

    id = test_createUser()
    params = {'name': fake.name(), 'job': fake.job()}
    response = test_putPatch('put')
    status(response, 200)
    assert bool(response.json()) == True
    response = test_putPatch('patch')
    status(response, 200)
    assert bool(response.json()) == True
    return id

def test_deleteUser():
    id = test_updateUser()
    response = request(getData('user', 'list') + str(id), 'delete')
    status(response, 204)
    assert not response.text

# registration
def test_registerUser():
    # user credentials are hard coded
    # need to use same credentials to work
    params = {'email': 'eve.holt@reqres.in', 'password': 'pistol'}
    loginRegister(params, 'register', 200, 'token', creds=True)
    return params

def test_notRegistered():
    loginRegister(test_registerUser(), 'register', 400, 'error')

def test_userLogin():
    params = {'email': 'eve.holt@reqres.in', 'password': 'cityslicka'}
    loginRegister(params, 'login', 200, 'token', creds=True)
    return params

def test_notUserLogin():
    loginRegister(test_userLogin(), 'login', 400, 'error')
