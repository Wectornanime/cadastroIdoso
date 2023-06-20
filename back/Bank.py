import mysql.connector
import uuid
import json


with open('envoriments.json') as envoriments:
    env = json.load(envoriments)


def connect():
    return mysql.connector.connect (
        host = env['db']['host'],
        user = env['db']['user'],
        password = env['db']['password'],
        database = env['db']['database']
    )


class Elderly():
    def insert(name, birth, cpf):
        db = connect()
        mycursor = db.cursor()
        id = str(uuid.uuid4())
        cmd = "INSERT INTO cadastroidoso (id, name, birth, cpf) VALUE (%s, %s, %s, %s)"
        mycursor.execute(cmd, (id, name, birth, cpf))
        db.commit()
        db.close()

    
    def list(id=''):
        db = connect()
        mycursor = db.cursor()
        ret = list()
        line = dict()

        if (id == ''):
            cmd = "SELECT id, name, birth, cpf FROM cadastroidoso ORDER BY name"
            mycursor.execute(cmd)
            res = mycursor.fetchall()

            for col in res:
                line['id'] = col[0]
                line['name'] = col[1]
                line['birth'] = col[2]
                line['cpf'] = col[3]
                line['remedys'] = ElderlyRemedy.listRemedyByElderly(col[0])

                ret.append(line.copy())
                line.clear()

        else:
            cmd = f"SELECT id, name, birth, cpf FROM cadastroidoso WHERE id = '{id}'"
            mycursor.execute(cmd)
            data = mycursor.fetchone()
            line['id'] = data[0]
            line['name'] = data[1]
            line['birth'] = data[2]
            line['cpf'] = data[3]
            line['remedys'] = ElderlyRemedy.listRemedyByElderly(data[0])

            ret.append(line.copy())
            line.clear()

        db.close()
        return ret
    

    def delete(id):
        db = connect()
        mycursor = db.cursor()
        cmd = f"DELETE FROM cadastroidoso WHERE id = '{id}'"
        mycursor.execute(cmd)
        
        db.commit()
        db.close()


    def update(id, values):
        db = connect()
        mycursor = db.cursor()
        print(values)
        for key, value in values.items():
            if key == 'name':
                cmd = f"UPDATE cadastroidoso SET name = '{value}' WHERE id = '{id}'"
            elif key == 'birth':
                cmd = f"UPDATE cadastroidoso SET birth = '{value}' WHERE id = '{id}'"
            elif key == 'cpf':
                cmd = f"UPDATE cadastroidoso SET cpf = '{value}' WHERE id = '{id}'"
            
            mycursor.execute(cmd)
            db.commit()

        db.close()


class Remedy():
    def insert(name, isControled = 'nao'):
        db = connect()
        mycursor = db.cursor()
        id = str(uuid.uuid4())
        cmd = "INSERT INTO remedios (id, name, isControled) VALUE (%s, %s, %s)"
        mycursor.execute(cmd, (id, name, isControled.lower()))
        db.commit()
        db.close()

    
    def list(id=''):
        db = connect()
        mycursor = db.cursor()
        ret = list()
        line = dict()

        if (id == ''):
            cmd = "SELECT id, name, isControled FROM remedios"
            mycursor.execute(cmd)
            res = mycursor.fetchall()

            for col in res:
                line['id'] = col[0]
                line['name'] = col[1]
                line['isControled'] = col[2]
                ret.append(line.copy())
                line.clear()

        else:
            cmd = f"SELECT id, name, isControled FROM remedios WHERE id = '{id}'"
            mycursor.execute(cmd)
            data = mycursor.fetchone()
            line['id'] = data[0]
            line['name'] = data[1]
            line['isControled'] = data[2]
            ret.append(line.copy())
            line.clear()

        db.close()
        return ret
    

    def delete(id):
        db = connect()
        mycursor = db.cursor()
        cmd = f"DELETE FROM remedios WHERE id = '{id}'"
        mycursor.execute(cmd)
        
        db.commit()
        db.close()


    def update(id, values):
        db = connect()
        mycursor = db.cursor()
        print(values)
        for key, value in values.items():
            if key == 'name':
                cmd = f"UPDATE remedios SET name = '{value}' WHERE id = '{id}'"
            elif key == 'isControled':
                cmd = f"UPDATE remedios SET isControled = '{value}' WHERE id = '{id}'"

            mycursor.execute(cmd)
            db.commit()

        db.close()


class ElderlyRemedy():
    def insert(elderlyID, remedyList):
        db = connect()
        mycursor = db.cursor()
        for remedyID in remedyList:
            id = str(uuid.uuid4())
            cmd = "INSERT INTO remedio_idoso (id, elderly_id, remedy_id) VALUES (%s, %s, %s)"
            mycursor.execute(cmd, (id, elderlyID, remedyID))
            db.commit()
        db.close()


    def listRemedyByElderly(elderlyID):
        db = connect()
        mycursor = db.cursor()
        ret = list()
        line = dict()
        cmd = f"SELECT remedy.id, remedy.name, remedy.isControled FROM remedios AS remedy INNER JOIN remedio_idoso AS rel ON remedy.id = rel.remedy_id WHERE rel.elderly_id = '{elderlyID}'"
        # cmd = "SELECT remedy.id, remedy.name FROM remedio_idoso as table INNER JOIN remedios as remedy ON remedy.id = table.remedy_id WHERE remedy.elderly_id = %d"
        mycursor.execute(cmd)
        res = mycursor.fetchall()

        for col in res:
            line['id'] = col[0]
            line['name'] = col[1]
            line['isControled'] = col[2]
            ret.append(line.copy())
            line.clear()

        db.close()
        return ret
    

    def listElderlyByRemedy(remedyID):
        db = connect()
        mycursor = db.cursor()
        ret = list()
        line = dict()
        cmd = F"SELECT elderly.id, elderly.name FROM cadastroidoso AS elderly INNER JOIN remedio_idoso AS rel ON elderly.id = rel.elderly_id WHERE rel.remedy_id = '{remedyID}'"
        # cmd = "SELECT elderly.id, elderly.name FROM remedio_idoso as table INNER JOIN cadastroidoso as elderly ON elderly.id = table.elderly_id WHERE table.remedy_id = %s"
        mycursor.execute(cmd, (remedyID))
        res = mycursor.fetchall()

        for col in res:
            line['id'] = col[0]
            line['name'] = col[1]
            ret.append(line.copy())
            line.clear()

        db.close()
        return ret
    

    def delete(elderlyID, remedyID):
        db = connect()
        mycursor = db.cursor()
        cmd = f"DELETE FROM remedio_idoso WHERE remedy_id = '{remedyID}' AND elderly_id = '{elderlyID}'"
        mycursor.execute(cmd)
        
        db.commit()
        db.close()
