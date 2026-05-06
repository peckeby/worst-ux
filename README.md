# Bureaucracy Simulator

A deliberately hostile React app that simulates paperwork, queues, and clerical delays.

## Features
- Triplicate login with signature speed checks
- Notary popup unlock flow with temporary access
- Active waiting room that requires focus + mouse movement
- Ink reservoir that drains on typing and clicks
- Circular help center, rejection stamp, and processing fee

## Run
```zsh
npm install
npm run dev
```

## Build
```zsh
npm run build
npm run preview
```

## Notes
- Open the Notary popup from the main window.
- Queue advancement requires focus, mouse movement, and running hold music.
- When ink hits 0, shake the browser window to refill.

