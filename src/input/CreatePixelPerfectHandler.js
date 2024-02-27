/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * Creates a new Pixel Perfect Handler function.
 *
 * Access via `InputPlugin.makePixelPerfect` rather than calling it directly.
 *
 * @function Phaser.Input.CreatePixelPerfectHandler
 * @since 3.10.0
 *
 * @param {Phaser.Textures.TextureManager} textureManager - A reference to the Texture Manager.
 * @param {number} alphaTolerance - The alpha level that the pixel should be above to be included as a successful interaction.
 *
 * @return {function} The new Pixel Perfect Handler function.
 */
//msc: extrude for clicking
var CreatePixelPerfectHandler = function (textureManager, alphaTolerance, extrude = 0, extrudeJumps = 1)
{
    return function (hitArea, x, y, gameObject)
    {        

        var alpha = 0.0;        
        for( let xd =  x - extrude ; xd <=  x + extrude ; xd += extrudeJumps ){
            for( let yd =  y - extrude ; yd <=  y + extrude ; yd += extrudeJumps ){
                var temp_alpha = textureManager.getPixelAlpha(xd, yd, gameObject.texture.key, gameObject.frame.name);
                if(temp_alpha != null){
                    alpha = Math.max(alpha, temp_alpha);
                }
            }

        }        

        return (alpha && alpha >= alphaTolerance);
    };
};

module.exports = CreatePixelPerfectHandler;
