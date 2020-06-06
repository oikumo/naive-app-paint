import { runTests } from 'naive-tests'
import path from 'path'

runTests(path.join(process.cwd(), 'tests'), (err, results) => {
    if (err) {
        console.error(`test runner import fails - Error${err.message}`)
        process.exit(1)
    }

    const testsPassed = results.filter((result) => result.errors.length === 0)
    const testsFailed = results.filter((result) => result.errors.length > 0)

    testsPassed.forEach((result) => {
        console.log(result)
    })

    testsFailed.forEach(result => {
        console.error(result.info)
        result.errors.forEach((err) => {
            console.error(err)
        })
    })

    console.log(`results: total: ${results.length} passed: ${testsPassed.length} failed: ${testsFailed.length}`)

    if (testsFailed.length > 0) {
        process.exit(1)
    }
})