function query(str) {
    for (const ch of str) {
        if (ch === 'a') {
            return true;
        }
    }

    return false;
}

console.log(query("I'm a dog!!!"));
