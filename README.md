# Insane Chess

Chess where every capture is settled by a first-person duel. The stronger the piece, the stronger its weapon. If the attacker wins the duel the capture stands; if the defender wins, the attacking piece is taken instead.

The whole game is one file, `index.html`. There is nothing to build or install.

## Play

Open `index.html` in a browser, or serve the folder with any static web server.

Choose an opponent:

- **Computer** at four levels, from beginner to strong.
- **A friend, same screen.** The capturing player fights the duel; the computer controls the defender.
- **A friend, another device.** Real two-player games, with player-versus-player duels.

## Playing on two devices

Both players need the page open from the same web address (for example a GitHub Pages site for this repository).

1. One player picks "A friend, another device", chooses a colour, and presses **Create a game**.
2. They send the five-character code, or the invite link, to the other player.
3. The other player opens the invite link, or picks the same option, types the code and presses **Join**.

The host starts new games and sets the clock and the capture rule. If the connection drops, the guest can rejoin with the same code and the game carries on.

The two browsers connect directly to each other using WebRTC. The public PeerJS service is used only to introduce them; no game data is stored on a server. A few networks (some school or office networks) block direct connections.

## Weapons

| Piece | Weapon | Health |
|---|---|---|
| Pawn | Pistol | 70 |
| Knight | Shotgun | 90 |
| Bishop | Sniper rifle | 90 |
| Rook | Machine gun | 120 |
| Queen | Plasma cannon | 130 |
| King | Royal hand cannon | 125 |

A king that loses a duel loses the game. A king left in check after a lost duel can be attacked directly.

## Duel controls

- **Keyboard and mouse:** W A S D to move, mouse or arrow keys to aim, hold the mouse button or Space to fire.
- **Touch:** drag the left half of the arena to move, drag the right half to aim and fire.

## Other features

Clocks, hints, take-backs, move review, three board colours, sound, and PGN export. Set "Captures" to "Classic chess" to play without duels.
