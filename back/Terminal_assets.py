import os
from time import sleep
import json
from datetime import datetime

with open('options.json') as file:
    opc = json.load(file)


class Menu():
    def openMainMenu():
        while (True):
            print(f"{'-'*30}\n{'Menu principal':^30}\n{'-'*30}")
            print('Escolha uma opção:')
            listOpc = []
            for key, value in enumerate(opc['main']):
                listOpc.append(key)
                print(f"[{key}] - {value}")
            
            try:
                opc = int(input('↳ '))
                if opc in listOpc:
                    return opc
                else:
                    showError('Digite uma opção válida!')
            except:
                showError('Digite um número inteiro!')


    def openRegisterElderlyMenu():
        while (True):
            print(f"{'-'*30}\n{'Menu de registro de idosos':^30}\n{'-'*30}")
            name = input('Nome completo: ').capitalize()
            birth = Input.date('Data de nascimento [dd-mm-aaaa]: ')
            cpf = Input.cpf('CPF [000.000.000-00]: ')
            
            while(True):
                ret = input('\nOs dados estão certos [s/n]?').lower()[0]
                if ret == 's':
                    break
                        
            return {'name': name, 'birth': birth, 'cpf': cpf}
        

    def openListerElderly(datas):
        for data in datas:
            print(f"Nome Completo: {data['name']}")
            print(f"CPF: {data['cpf']}")
            print(f"Idade: {convertAge(data['birth'])}\n")



        

        


def showError(msg):
    os.system('cls')
    print('\033[031m'+'ERROR!' + msg +'\033[0;0m')
    sleep(0.5)
    os.system('cls')


def showExitMsg():
    os.system('cls')
    print('Até a proxima!')
    sleep(1)
    os.system('cls')


def convertAge(date):
    year = int(date[0:4])
    month = int(date[5:7])
    day = int(date[8:])

    ret = datetime.now().year - year

    if datetime.now().month < month:
        return ret - 1
    elif datetime.now().month == month and datetime.now().day < day:
        return ret - 1
    else:
        return ret



class Input():
    def date(msg):
        date = input(msg)
        if date.isdigit():
            return f'{date[4]}{date[5]}{date[6]}{date[7]}-{date[2]}{date[3]}-{date[0]}{date[1]}'
        
        elif date.count('-') == 2 or date.count('/') == 2:
            return f'{date[6]}{date[7]}{date[8]}{date[9]}-{date[3]}{date[4]}-{date[0]}{date[1]}'
    

    def cpf(msg):
        cpf = input(msg)
        if cpf.isdigit():
            return f'{cpf[0]}{cpf[1]}{cpf[2]}.{cpf[3]}{cpf[4]}{cpf[5]}.{cpf[6]}{cpf[7]}{cpf[8]}-{cpf[9]}{cpf[10]}'
        
        elif cpf.count('-') == 1 and cpf.count('.') == 3:
            return cpf
    

print(Menu.openMainMenu())