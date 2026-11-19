radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 100)
    } else if (receivedNumber == 2) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 80)
    } else if (receivedNumber == 3) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 30)
        basic.pause(200)
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 100)
    } else if (receivedNumber == 4) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, 30)
        basic.pause(200)
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 100)
    } else if (receivedNumber == 5) {
        // PARAR TODO: motores y música al instante
        Kitronik_Move_Motor.stop()
        Musica = 0
        music.stopAllSounds()
    } else if (receivedNumber == 6) {
        Kitronik_Move_Motor.beepHorn()
    } else if (receivedNumber == 7) {
        // Detenemos el sonido actual antes de cambiar de canción
        music.stopAllSounds()
        Musica = (Musica + 1) % 3
    }
})

input.onButtonPressed(Button.A, function () {
    Kitronik_Move_Motor.stop()
    Musica = 0
    music.stopAllSounds()
})

// Función auxiliar para tocar una nota SOLO si la música sigue encendida
function tocarNota(frecuencia: number, duracion: number) {
    if (Musica != 0) {
        music.playTone(frecuencia, duracion)
    }
}

let Musica = 0
radio.setGroup(5)
let moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
Musica = 0
music.setTempo(180)

// Bucle de música interrumpible
basic.forever(function () {
    if (Musica == 1) {
        // Canción 1: Jingle Bells (Villancico)
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
        // Canción 2: Star Wars (Marcha Imperial)
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

// Sensor de distancia (anticolisión)
basic.forever(function () {
    if (Kitronik_Move_Motor.measure() <= 5) {
        Kitronik_Move_Motor.stop()
    }
})

// Luces LED y cara en la matriz
basic.forever(function () {
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        # . . . #
        . # # # .
        `)
    moveMotorZIP.setZipLedColor(0, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Green))
    moveMotorZIP.setZipLedColor(1, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
    moveMotorZIP.setZipLedColor(2, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Green))
    moveMotorZIP.setZipLedColor(3, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
    moveMotorZIP.show()
    basic.pause(500)
    moveMotorZIP.setZipLedColor(0, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
    moveMotorZIP.setZipLedColor(1, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Green))
    moveMotorZIP.setZipLedColor(2, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
    moveMotorZIP.setZipLedColor(3, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Green))
    moveMotorZIP.show()
    basic.pause(500)
})