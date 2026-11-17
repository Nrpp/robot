radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 100)
    } else if (receivedNumber == 2) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 80)
    } else if (receivedNumber == 3) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 30)
        basic.pause(100)
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 100)
    } else if (receivedNumber == 4) {
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, 30)
        basic.pause(100)
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 100)
    } else if (receivedNumber == 5) {
        Kitronik_Move_Motor.stop()
    } else if (receivedNumber == 6) {
        Kitronik_Move_Motor.beepHorn()
    } else if (receivedNumber == 7) {
        if (Musica == 0) {
            Musica += 1
        } else {
            Musica += 0
        }
    }
})
input.onButtonPressed(Button.A, function () {
    Kitronik_Move_Motor.stop()
})
let Musica = 0
radio.setGroup(5)
let moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
music.setTempo(210)
music.setTempo(210)
basic.forever(function () {
    if (Musica == 1) {
        // Mi (E4)
        music.playTone(330, music.beat(BeatFraction.Whole))
        // Mi (E4)
        music.playTone(330, music.beat(BeatFraction.Whole))
        // Mi (E4)
        music.playTone(330, music.beat(BeatFraction.Double))
        // Mi (E4)
        music.playTone(330, music.beat(BeatFraction.Whole))
        // Mi (E4)
        music.playTone(330, music.beat(BeatFraction.Whole))
        // Mi (E4)
        music.playTone(330, music.beat(BeatFraction.Double))
        // Mi (E4)
        music.playTone(330, music.beat(BeatFraction.Whole))
        // Sol (G4)
        music.playTone(392, music.beat(BeatFraction.Whole))
        // Do (C4)
        music.playTone(262, music.beat(BeatFraction.Whole))
        // Re (D4)
        music.playTone(294, music.beat(BeatFraction.Whole))
        // Mi (E4 - nota larga)
        music.playTone(330, music.beat(BeatFraction.Breve))
        // Fa (F4)
        music.playTone(349, music.beat(BeatFraction.Whole))
        // Fa (F4)
        music.playTone(349, music.beat(BeatFraction.Whole))
        // Fa (F4)
        music.playTone(349, music.beat(BeatFraction.Whole))
        // Fa (F4)
        music.playTone(349, music.beat(BeatFraction.Whole))
        // Fa (F4)
        music.playTone(349, music.beat(BeatFraction.Whole))
        // Mi (E4)
        music.playTone(330, music.beat(BeatFraction.Whole))
        // Mi (E4)
        music.playTone(330, music.beat(BeatFraction.Whole))
        // Mi (E4)
        music.playTone(330, music.beat(BeatFraction.Half))
        // Mi (E4)
        music.playTone(330, music.beat(BeatFraction.Half))
        // Mi (E4)
        music.playTone(330, music.beat(BeatFraction.Whole))
        // Re (D4)
        music.playTone(294, music.beat(BeatFraction.Whole))
        // Re (D4)
        music.playTone(294, music.beat(BeatFraction.Whole))
        // Mi (E4)
        music.playTone(330, music.beat(BeatFraction.Whole))
        // Re (D4)
        music.playTone(294, music.beat(BeatFraction.Double))
        // Sol (G4)
        music.playTone(392, music.beat(BeatFraction.Double))
    }
})
basic.forever(function () {
    if (Kitronik_Move_Motor.measure() <= 5) {
        Kitronik_Move_Motor.stop()
    }
})
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
