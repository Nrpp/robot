radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        avanzando = true
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 100)
    } else if (receivedNumber == 2) {
        avanzando = false
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 80)
    } else if (receivedNumber == 3) {
        // Gira a la izquierda continuamente mientras se mantenga A
        avanzando = false
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 40)
    } else if (receivedNumber == 4) {
        // Gira a la derecha continuamente mientras se mantenga B
        avanzando = false
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, 40)
    } else if (receivedNumber == 5) {
        // Parar motores y música
        avanzando = false
        Kitronik_Move_Motor.stop()
        Musica = 0
        music.stopAllSounds()
    } else if (receivedNumber == 6) {
        Kitronik_Move_Motor.beepHorn()
    } else if (receivedNumber == 7) {
        music.stopAllSounds()
        Musica = (Musica + 1) % 3
    }
})
input.onButtonPressed(Button.A, function () {
    avanzando = false
    Kitronik_Move_Motor.stop()
    Musica = 0
    music.stopAllSounds()
})
function tocarNota (frecuencia: number, duracion: number) {
    if (Musica != 0) {
        music.playTone(frecuencia, duracion)
    }
}
let Musica = 0
let avanzando = false
radio.setGroup(5)
let moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
moveMotorZIP.clear()
moveMotorZIP.show()
music.setTempo(180)
// Muestra la cara sonriente una sola vez al iniciar
basic.showLeds(`
    . . . . .
    . # . # .
    . . . . .
    # . . . #
    . # # # .
    `)
// Control de luces: solo los 2 LEDs delanteros (0 y 1) en rojo/verde al avanzar
basic.forever(function () {
    if (avanzando) {
        moveMotorZIP.clear()
        moveMotorZIP.setZipLedColor(0, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Green))
        moveMotorZIP.setZipLedColor(1, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
        moveMotorZIP.show()
        basic.pause(350)
        if (avanzando) {
            moveMotorZIP.clear()
            moveMotorZIP.setZipLedColor(0, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
            moveMotorZIP.setZipLedColor(1, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Green))
            moveMotorZIP.show()
            basic.pause(350)
        }
    } else {
        moveMotorZIP.clear()
        moveMotorZIP.show()
        basic.pause(100)
    }
})
// Bucle de música
basic.forever(function () {
    if (Musica == 1) {
        tocarNota(330, music.beat(BeatFraction.Whole))
        tocarNota(330, music.beat(BeatFraction.Whole))
        tocarNota(330, music.beat(BeatFraction.Double))
        tocarNota(330, music.beat(BeatFraction.Whole))
        tocarNota(330, music.beat(BeatFraction.Whole))
        tocarNota(330, music.beat(BeatFraction.Double))
        tocarNota(330, music.beat(BeatFraction.Whole))
        tocarNota(392, music.beat(BeatFraction.Whole))
        tocarNota(262, music.beat(BeatFraction.Whole))
        tocarNota(294, music.beat(BeatFraction.Whole))
        tocarNota(330, music.beat(BeatFraction.Breve))
        if (Musica == 1) {
            tocarNota(349, music.beat(BeatFraction.Whole))
            tocarNota(349, music.beat(BeatFraction.Whole))
            tocarNota(349, music.beat(BeatFraction.Whole))
            tocarNota(349, music.beat(BeatFraction.Whole))
            tocarNota(349, music.beat(BeatFraction.Whole))
            tocarNota(330, music.beat(BeatFraction.Whole))
            tocarNota(330, music.beat(BeatFraction.Whole))
            tocarNota(330, music.beat(BeatFraction.Half))
            tocarNota(330, music.beat(BeatFraction.Half))
            tocarNota(330, music.beat(BeatFraction.Whole))
            tocarNota(294, music.beat(BeatFraction.Whole))
            tocarNota(294, music.beat(BeatFraction.Whole))
            tocarNota(330, music.beat(BeatFraction.Whole))
            tocarNota(294, music.beat(BeatFraction.Double))
            tocarNota(392, music.beat(BeatFraction.Double))
        }
    } else if (Musica == 2) {
        tocarNota(440, music.beat(BeatFraction.Whole))
        tocarNota(440, music.beat(BeatFraction.Whole))
        tocarNota(440, music.beat(BeatFraction.Whole))
        tocarNota(349, music.beat(BeatFraction.Half))
        tocarNota(523, music.beat(BeatFraction.Half))
        tocarNota(440, music.beat(BeatFraction.Whole))
        tocarNota(349, music.beat(BeatFraction.Half))
        tocarNota(523, music.beat(BeatFraction.Half))
        tocarNota(440, music.beat(BeatFraction.Double))
    }
    basic.pause(100)
})
// Anticolisión por ultrasonidos
basic.forever(function () {
    if (Kitronik_Move_Motor.measure() <= 5) {
        avanzando = false
        Kitronik_Move_Motor.stop()
    }
})
