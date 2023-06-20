from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import Bank

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

#elderly
@app.route('/elderly/create', methods=['POST'])
def create_elderly():
    data = request.get_json()
    Bank.Elderly.insert(name=data['name'], birth=data['birth'], cpf=data['cpf'])

    return jsonify(Bank.Elderly.list())


@app.route('/elderly/list/', defaults={'id': ''}, methods=['GET'])
@app.route('/elderly/list/<id>', methods=['GET'])
@cross_origin()
def list_elderly(id):
    if id != '':
        return Bank.Elderly.list(id)
    else:
        return Bank.Elderly.list()


@app.route('/elderly/delete/<id>', methods=['DELETE'])
def delete_elderly(id):
    try:
        Bank.Elderly.delete(id)
    except:
        print(id)
    
    return jsonify(Bank.Elderly.list())


@app.route('/elderly/update/<id>', methods=['PUT'])
def update_elderly(id):
    data = request.get_json()
    Bank.Elderly.update(id, data.copy())
    print(data)
    return jsonify(Bank.Elderly.list())


#remedy
@app.route('/remedy/create', methods=['POST'])
def create_remedy():
    data = request.get_json()
    try:
        Bank.Remedy.insert(name=data['name'], isControled=data['isControled'].lower())
    except:
        Bank.Remedy.insert(name=data['name'])

    return jsonify(Bank.Remedy.list())


@app.route('/remedy/list/', defaults={'id': ''}, methods=['GET'])
@app.route('/remedy/list/<id>', methods=['GET'])
def list_remedy(id):
    if id != '':
        return Bank.Remedy.list(id)
    else:
        return Bank.Remedy.list()


@app.route('/remedy/delete/<id>', methods=['DELETE'])
def delete_remedy(id):
    try:
        Bank.Remedy.delete(id)
    except:
        pass
    
    return jsonify(Bank.Remedy.list())


@app.route('/remedy/update/<id>', methods=['PUT'])
def update_remedy(id):
    data = request.get_json()
    Bank.Remedy.update(id, data.copy())
    return jsonify(Bank.Remedy.list())


#elderly remedy
@app.route('/elderly/<id>/remedy/create/', methods=['POST'])
def create_elderly_remedy(id):
    data = request.get_json()
    Bank.ElderlyRemedy.insert(elderlyID=id, remedyList=data['remedys'])
    
    return Bank.ElderlyRemedy.listRemedyByElderly(id)


@app.route('/elderly/<id>/remedy/list/', methods=['GET'])
def list_elderly_remedy(id):
    return Bank.ElderlyRemedy.listRemedyByElderly(id)


#elderly/<id>/remedy/delete/<id>
@app.route('/elderly/<elderlyID>/remedy/delete/<remedyID>', methods=['DELETE'])
def delete_elderly_remedy(elderlyID, remedyID):
    Bank.ElderlyRemedy.delete(elderlyID=elderlyID, remedyID=remedyID)
        
    return Bank.ElderlyRemedy.listRemedyByElderly(elderlyID)


# @app.route('/elderly-remedy/create/', methods=['POST'])
# def create_elderly_remedy():
#     data = request.get_json()
#     Bank.ElderlyRemedy.insert(elderlyID=data['elderlyID'], remedyID=data['remedyID'])
    
#     return jsonify(Bank.ElderlyRemedy.listRemedyByElderly(data['elderlyID']))


# @app.route('/elderly-remedy/delete/<id>', methods=['DELETE'])
# def delete_elderly_remedy(id):
#     try:
#         Bank.ElderlyRemedy.delete(id)
#     except:
#         pass
    
#     return ''





# ###
# /elderly/<elderlyID>/remedy/
# /elderly/<elderlyID>/remedy/<remedyID>
# /elderly-remedy/delete/<id>

# /remedy/<elderlyID>/elderly
# /remedy/<elderlyID>/elderly/<remedyID>
# ###




app.run(port=3000, host='localhost', debug=True)