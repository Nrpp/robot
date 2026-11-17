def on_received_number(receivedNumber):
    if receivedNumber == 1:
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.FORWARD, 100)
    elif receivedNumber == 2:
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.REVERSE, 80)
    elif receivedNumber == 3:
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.LEFT, 30)
        basic.pause(100)
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.FORWARD, 100)
    elif receivedNumber == 4:
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.RIGHT, 30)
        basic.pause(100)
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.FORWARD, 100)
    elif receivedNumber == 5:
        Kitronik_Move_Motor.stop()
    elif receivedNumber == 6:
        Kitronik_Move_Motor.beep_horn()
radio.on_received_number(on_received_number)

def on_button_pressed_a():
    Kitronik_Move_Motor.stop()
input.on_button_pressed(Button.A, on_button_pressed_a)

radio.set_group(5)
moveMotorZIP = Kitronik_Move_Motor.create_move_motor_zipled(4)
music.set_tempo(210)
music.set_tempo(210)
basic.show_leds("""
    . . . . .
    . # . # .
    . . . . .
    # . . . #
    . # # # .
    """)

def on_forever():
    moveMotorZIP.set_zip_led_color(0,
        Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.RED))
    moveMotorZIP.set_zip_led_color(1,
        Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.GREEN))
    moveMotorZIP.set_zip_led_color(2,
        Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.RED))
    moveMotorZIP.set_zip_led_color(3,
        Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.GREEN))
    moveMotorZIP.show()
    basic.pause(500)
    moveMotorZIP.set_zip_led_color(0,
        Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.GREEN))
    moveMotorZIP.set_zip_led_color(1,
        Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.RED))
    moveMotorZIP.set_zip_led_color(2,
        Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.GREEN))
    moveMotorZIP.set_zip_led_color(3,
        Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.RED))
    moveMotorZIP.show()
    basic.pause(500)
basic.forever(on_forever)

def on_forever2():
    if Kitronik_Move_Motor.measure() <= 5:
        Kitronik_Move_Motor.stop()
basic.forever(on_forever2)
