let lastKey;
let keyBuffer;

function getName()
{
    return 'Test Server';
}

function onConnect()
{
    // Reset the server variables when a new user connects:
    lastKey = '';
    keyBuffer = loadData();
}

function onUpdate()
{
    // It is safe to completely redraw the screen during every update:
    clearScreen();

    // Draw the full color palette:
    drawText('COLOR REFERENCE', 14, 21, 2);
    drawBox(10, 1, 3, 54, 3);
    for (let i = 1; i <= 17; i++)
    {
        const text = (i < 10) ? ('0' + i) : i;
        drawText(text, i, i * 3, 4);
    }

    // Show the most recently pressed key:
    drawText('INPUT', 14, 2, 7);
    drawBox(10, 1, 8, 7, 5);
    drawText('000', 5, 3, 10);
    drawText(lastKey, 17, 6 - lastKey.length, 10);

    // Draw the full set of font characters:
    drawText('FONT REFERENCE', 14, 25, 7);
    drawBox(10, 9, 8, 46, 5);
    drawText('AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUu', 17, 11, 9);
    drawText('VvWwXxYyZz.,:;!?&#/\\%\'"0123456789+-*()[]^`', 17, 11, 10);
    drawText('█▟▙▜▛▀▄▐▌▝▘▗▖─═║╔╗╚╝╠╣╦╩╬><▲▼☺☻⚉ ™ ♦ ♣ ♠ ♥', 17, 11, 11);

    // Draw a persisted and editable text field:
    drawText('PERSISTENCE TEST', 14, 20, 14);
    drawBox(10, 1, 15, 54, 3);
    drawText(keyBuffer + '█', 17, 3, 16);
}

function onInput(key)
{
    // Remember the last key pressed:
    lastKey = key.toString();

    // Update the persisted text field:
    if (key == 8 && keyBuffer.length > 0)
    {
        keyBuffer = keyBuffer.substring(0, keyBuffer.length - 1);
        saveData(keyBuffer);
    }
    else if (key >= 32 && key < 127 && keyBuffer.length < 49)
    {
        keyBuffer = keyBuffer + String.fromCharCode(key);
        saveData(keyBuffer);
    }
}
