"use strict";

var _ = require("underscore");
var Layer = require("../../layer/Layer");
var Arc = require("../../element/Arc");

const _default_config = {
  input: "close",
  output: null,
  period: 14,
  color: "red",
  minValue: 0.0,
  maxValue: 100.0
};

/**
 * Represents a Indicator From Server
 * <br><br>
 * @extends layer.Layer
 * @memberof layer.indicator
 */
class ServerIndicatorLayer extends Layer {

  /**
   * Instantiate ServerIndicatorLayer
   * @constructor
   * @param {Object} config
   */
  constructor(config) {
    config = _.extend({}, _default_config, config);
    super(config);
  }

  /**
   * Render layer onto canvas
   * @param {timeseries.TimeSeriesData} data
   * @param {number} count
   * @param {number} offset
   * @param {valueToPixel} valueToPixel
   * @param {indexToPixel} indexToPixel
   */
  draw(data, count, offset, valueToPixel, indexToPixel) {

    var context = this._getContext();
    var field_map = data.getFieldMap();
    var data_arr = data.getRawData();
    this.elements = [];
    var prev_arc = null;

    for(var i = offset >= 0 ? offset : 0; i < offset + count && i < data_arr.length; i++)
    {
      var dat = data_arr[i];

      var arc = new Arc(
        this,
        i,
        dat[field_map.time],
        dat[this.output],
        prev_arc);
      this.elements.push(arc);
      arc.draw(context, valueToPixel, indexToPixel, this);

      prev_arc = arc;
    }

  }

}

module.exports = RSILayer;
