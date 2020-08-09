function queryAb(str) {
    if (!str || str.length < 2) {
        return -1;
    }

    let i = 0;
    while(i < str.length - 1) {
        let curChar = str[i]
        let nextChar = str[i + 1]

        if (curChar === 'a') {
            if (nextChar === 'b') {
                return i;
            } else {
                i++;
                continue;
            }
        } else {
            if (nextChar === 'a') {
                i++;
            } else {
                i += 2;
            }
            continue;
        }
    }

    return -1;
}

console.log(queryAb("I'm b dog!!!ab"));
