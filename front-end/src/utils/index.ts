export const colorLetterMapper = (word: string) => {
    const letter = (word ?? '')[0].toLowerCase()
    switch(letter){
        case 'a':
        case 'b':
        case 'c':
            return {textColor: 'text-white', bgColor: 'bg-red-500'}
        case 'd':
        case 'e':
        case 'f':
            return {textColor: 'text-slate-800', bgColor: 'bg-yellow-400'}
        case 'g':
        case 'h':
        case 'i':
            return {textColor: 'text-slate-800', bgColor: 'bg-teal-300'}
        case 'k':
        case 'l':
        case 'm':
            return {textColor: 'text-slate-50', bgColor: 'bg-blue-600'}
        case 'n':
        case 'o':
        case 'p':
            return {textColor: 'text-slate-50', bgColor: 'bg-indigo-600'}
        case 'q':
        case 'r':
        case 's':
            return {textColor: 'text-slate-800', bgColor: 'bg-amber-400'}
        case 't':
        case 'u':
        case 'v':
            return {textColor: 'text-slate-50', bgColor: 'bg-pink-700'}
        default:
            return {textColor: 'text-slate-50', bgColor: 'bg-black-800'}
    }
}

export const name2IconTextMapper = (words: string) => {
    const arr = words.split(' ')
    return arr.length == 1 ? `${arr[0][0] ?? 'N/A'}${arr[0][1] ?? ''}`: `${arr[0][0] ?? 'N/A'}${arr[1][0] ?? ''}`
}

