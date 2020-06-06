import { runTests } from 'naive-tests'
import path from 'path'

/*
runTests(path.join(process.cwd(), 'tests'), (err, results) => {
    if (err)
        throw new Error('test runner import fails')

    results.forEach(result => {
        if (result.errors.length > 0) {
            console.error(result.info)
            result.errors.forEach((error) => {
                console.log(error)
            })
            throw new Error('tests with errors')

        } else {
            console.log(result)
        }
    })
})
*/
process.exit(1);