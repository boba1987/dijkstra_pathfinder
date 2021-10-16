const HomeActions = require("./HomeActions")
// @ponicode
describe("HomeActions.getShortestPath", () => {
    test("0", () => {
        let callFunction = () => {
            HomeActions.getShortestPath("path/to/folder/", "./path/to/file", "C:\\\\path\\to\\folder\\", "\"[3,\"false\",false]\"")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            HomeActions.getShortestPath("./path/to/file", "path/to/folder/", "C:\\\\path\\to\\file.ext", "\"[3,\"false\",false]\"")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            HomeActions.getShortestPath(["path/to/file.ext", "C:\\\\path\\to\\file.ext", "path/to/folder/", "C:\\\\path\\to\\folder\\", "/path/to/file", ".", "./path/to/file"], "C:\\\\path\\to\\folder\\", "path/to/file.ext", "\"{\"x\":5,\"y\":6}\"")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            HomeActions.getShortestPath("C:\\\\path\\to\\file.ext", "path/to/file.ext", "./path/to/file", "\"{\"x\":[10,null,null,null]}\"")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            HomeActions.getShortestPath(["path/to/file.ext", "C:\\\\path\\to\\file.ext", "path/to/folder/", "C:\\\\path\\to\\folder\\", "/path/to/file", ".", "./path/to/file"], ".", "path/to/file.ext", "\"{\"x\":[10,null,null,null]}\"")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            HomeActions.getShortestPath(undefined, undefined, undefined, "")
        }
    
        expect(callFunction).not.toThrow()
    })
})
