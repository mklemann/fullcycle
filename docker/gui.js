const { runMain } = require("module")

const missingFromList = (arr) => {

    let nextNumber = arr[0]
    const newArray = []

    for (const i of arr) {
        nextNumber = nextNumber + 1

        if (arr.includes(nextNumber)) {
            continue
        } else {
            newArray.push(nextNumber)
        }

    }

    return newArray

}

const sumEqualZero = (arr) => {
    let newArray = []

    for (let i = 0; i < arr.length; i++) {
        newArray.push(arr[i])

        if (newArray.length === 3) {
            const sum = newArray.reduce((e, current, arr) => {
                return current + e
            }, 0)

            if(sum === 0) {
                return newArray
            } else {
                newArray = []
            }
        }
    }
}

console.log(sumEqualZero([0, 11, -12, 0, -4, +4, 8]))
