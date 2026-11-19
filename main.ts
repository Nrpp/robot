/**
 * Estados: 0 = Parado, 1 = Adelante, 2 = Atrás, 3 = Izquierda, 4 = Derecha
 */
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        estado = 1
        marchaAnterior = 1
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 100)
    } else if (receivedNumber == 2) {
        estado = 2
        marchaAnterior = 2
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 80)
    } else if (receivedNumber == 3) {
        estado = 3
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 40)
    } else if (receivedNumber == 4) {
        estado = 4
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, 40)
    } else if (receivedNumber == 5) {
        // Parar por completo
        estado = 0
        marchaAnterior = 0
        Kitronik_Move_Motor.stop()
        Musica = 0
        music.stopAllSounds()
    } else if (receivedNumber == 6) {
        Kitronik_Move_Motor.beepHorn()
    } else if (receivedNumber == 7) {
        music.stopAllSounds()
        Musica = (Musica + 1) % 3
    } else if (receivedNumber == 8) {
        // Terminó de girar: recupera la marcha que llevaba antes
        if (marchaAnterior == 1) {
            estado = 1
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 100)
        } else if (marchaAnterior == 2) {
            estado = 2
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 80)
        } else {
            estado = 0
            Kitronik_Move_Motor.stop()
        }
    }
})
input.onButtonPressed(Button.A, function () {
    estado = 0
    marchaAnterior = 0
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
let marchaAnterior = 0
let estado = 0
let faseLuz = false
radio.setGroup(5)
let moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
music.setTempo(180)
// Mantiene siempre la cara sonriente en la matriz LED
basic.forever(function () {
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        # . . . #
        . # # # .
        `)
})
// Control de luces navideñas según la dirección
basic.forever(function () {
    moveMotorZIP.clear()
    let colorA = faseLuz ? Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Green) : Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red)
let colorB = faseLuz ? Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red) : Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Green)
if (estado == 1) {
        // Adelante: LEDs 0 y 1
        moveMotorZIP.setZipLedColor(0, colorA)
        moveMotorZIP.setZipLedColor(1, colorB)
    } else if (estado == 2) {
        // Atrás: LEDs 2 y 3
        moveMotorZIP.setZipLedColor(2, colorA)
        moveMotorZIP.setZipLedColor(3, colorB)
    } else if (estado == 3) {
        // Izquierda: LEDs 0 y 3
        moveMotorZIP.setZipLedColor(0, colorA)
        moveMotorZIP.setZipLedColor(3, colorB)
    } else if (estado == 4) {
        // Derecha: LEDs 1 y 2
        moveMotorZIP.setZipLedColor(1, colorA)
        moveMotorZIP.setZipLedColor(2, colorB)
    } else {
        // Parado (estado == 0): Todos los LEDs
        moveMotorZIP.setZipLedColor(0, colorA)
        moveMotorZIP.setZipLedColor(1, colorB)
        moveMotorZIP.setZipLedColor(2, colorA)
        moveMotorZIP.setZipLedColor(3, colorB)
    }
    moveMotorZIP.show()
    faseLuz = !(faseLuz)
    basic.pause(350)
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
// Anticolisión por ultrasonidos (solo frena si va hacia adelante)
basic.forever(function () {
    if (Kitronik_Move_Motor.measure() <= 5 && estado == 1) {
        estado = 0
        marchaAnterior = 0
        Kitronik_Move_Motor.stop()
    }
})
