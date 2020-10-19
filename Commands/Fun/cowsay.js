const cowAscii = "\\  ^__^\n \\ (oo)\\_______\n   (__)\\        )\\/\\\n       ||----w |\n       ||     ||";

module.exports = {
    name: "cowsay",
    description: "Mke a cow say your message",
run: async  (client, message, args) => {
    if (!args[0])
        return message.channel.send("`Usage: =cowsay <msg>`");

    let text = args.join(" ");
    message.channel.send(`\`\`\`${makeSpeech(text, cowAscii)}\`\`\``);
}
};
function makeSpeech(text, cow) {
    let cowlines = cow.split('\n');
    let result = "";
    let length = Math.min(text.length, 25);

    result = result + " _" + repeatString("_", length) + "_ \n";
    var lines = splittext(text, length);
    for (var i = 0; i < lines.length; i++) {
        let line = lines[i];
        let beginChar = "|";
        let endChar = "|";
        if (i == 0) {
            if (lines.length == 1) {
                beginChar = "<";
                endChar = ">";
            }
            else {
                beginChar = "/";
                endChar = "\\";
            }
        }
        else if (i == lines.length - 1) {
            beginChar = "\\";
            endChar = "/";
        }
        let lineLength = line.length;
        let pad = length - lineLength;
        result = result + `${beginChar} ${line}${repeatString(" ", pad)} ${endChar}\n`;
    }

    result = result + " -" + repeatString("-", length) + "- \n";

    for (var i = 0; i < cowlines.length; i++) {
        let line = cowlines[i];
        result = result + repeatString(" ", length + 4) + line + "\n";
    }

    return result;
}

function splittext(text, maxlength) {
    let lines = [];
    let current = "";
    for (var i = 0; i < text.length; i++) {
        let character = text[i];
        switch (character) {
            case '\0':
            case '\b':
            case '\t':
            case '\v':
            case '\r':
            case "`":
                continue;
            case '\n':
                lines.push(current);
                current = "";
                continue;
            default:
                current = current + character;
                break;

        }
        if (current.length >= maxlength) {
            lines.push(current);
            current = "";
        }
    }
    if (current.length > 0) {
        lines.push(current);
        current = "";
    }
    return lines;
}

function repeatString(text, length) {
    let result = "";
    for (var i = 0; i <= length; i++) {
        result = result + text;
    }
    return result;
}