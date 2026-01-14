(async()=>{
    "use strict";

    // Dependencies
    const path = require("path")
    const fs = require("fs")

    // Main
    const loadModules = async(dir)=>{
        const entries = fs.readdirSync(dir, { withFileTypes: true })
        const files = await Promise.all(entries.map(async (ent) => {
            const res = path.resolve(dir, ent.name)
            if (ent.isDirectory()) return loadModulesFromDir(res)
            return ent.isFile() && res.endsWith(".js") ? res : null
        }))

        const jsFiles = files.flat().filter(Boolean)
        const modules = []
        for (const file of jsFiles) modules.push(require(file))
        return modules
    }

    // Example
    console.log("# Loaded Modules")
    const loadedModules = await loadModules("./modules")
    console.log(loadedModules)
    
    console.log("\n# Execution Test")
    for( const m of loadedModules ) m.run()
})()