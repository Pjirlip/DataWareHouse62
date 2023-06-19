#!/usr/bin/env node

import fs                           from "fs/promises"
import {parse, generate, stringify} from "csv/sync"
import path                         from "path"

const FILEPATH         = process.argv[2] 
const COUNT_DIMENSIONS = parseInt(process.argv[3] || 0)

const PARSER_OPTIONS = {
    skip_empty_lines: true,
    columns: false,
    delimiter: "\t",
}

const WRITER_OPTIONS = {
    delimiter: "\t"
}

const main = async () => {

    if(!COUNT_DIMENSIONS || !FILEPATH) {
        console.log(COUNT_DIMENSIONS, FILEPATH, process.argv[3])
        console.log("Arguments missing");
        return
    }

    let originalData = null
    const dimensions = []

    const file   = await fs.readFile(path.resolve(FILEPATH), "utf-8")
    originalData = parse(file, PARSER_OPTIONS)

    console.log("Orignal File before Transmutation: \n", originalData, "\n\n")

    for (let i = 0; i < COUNT_DIMENSIONS; i++) {
        dimensions.push(new Map())
        
        // Aufbau der Dimensionen. Benutze Maps als Datentyp statt Arrays um Duplikate später nicht rausfiltern zu müssen :-)
        for (let j = 0; j < originalData.length; j++) {
            if(!dimensions[i].has(originalData[j][i]))
            dimensions[i].set(originalData[j][i], originalData[j][i])
        }
    }
    console.log("Dimensions: \n", dimensions, "\n\n")
    
    // Anpassen der Keys im Originalfile und schreiben der Dimension-Files
    for (const [index, dim] of dimensions.entries()) {
        const d = Array.from(dim.values())

        originalData = originalData.map(row => {
            row[index] = d.indexOf(row[index]) + 1
            return row
        })

        fs.writeFile(`dim${index + 1}.csv`, stringify(d.map((row, index) => {
            return [index + 1, row]
        }), WRITER_OPTIONS))
    }

    console.log("Original File after Transmutation: \n", originalData)

    fs.writeFile("out.csv", stringify(originalData, WRITER_OPTIONS))
}


main()
