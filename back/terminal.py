import Terminal_assets as assets
import Bank

while (True):
    opc = assets.Menu.openMainMenu()

    if opc == 0:
        assets.showExitMsg()
        break

    elif opc == 1:
        values = assets.Menu.openRegisterElderlyMenu()
        Bank.Elderly.insert(name=values['name'], cpf=values['cpf'], birth=values['birth'])

    elif opc == 2:
        assets.Menu.openListerElderly(Bank.Elderly.list())