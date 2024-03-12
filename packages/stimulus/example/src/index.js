import { Application } from "@hotwired/stimulus"
import { definitionsFromContext } from "@hotwired/stimulus-webpack-helpers"

const application = Application.start()
const context = require.context("../../src/", true, /\.js$/)
application.load(definitionsFromContext(context))
window.Stimulus = application
