import ShaderToyMaterial from 'editor/animation/util/ShaderToyMaterial'
import fragShader from "../shaders/StarNest";
import ImpactAnalyser from '../audio/ImpactAnalyser'

export default class StarNestMaterial extends ShaderToyMaterial {
    constructor(item) {
        super(fragShader, {
            uniforms: {
                spe: { value: 1.8 },
                iterations: { value: 17 },
                formuparam: { value: 0.53 },
                volsteps: { value: 20 },
                stepsize: { value: 0.1 },
                zoom: { value: 0.8 },
                tile: { value: 0.85 },
                speed: { value: 0.01 },
                brightness: { value: 0.0015 },
                darkmatter: { value: 0.3 },
                distfading: { value: 0.73 },
                saturation: { value: 0.85 }
            }
        });

        this.brightenToAudio = true;
        this.brightenMultipler = 1;
        this.brightness = 1.0;

        item.__attribution = {
            showAttribution: true,
            name: "Star Nest",
            authors: [
                {
                    name: "Kali",
                    social1: {
                        type: "website",
                        url: "https://www.shadertoy.com/user/Kali"
                    }
                }
            ],
            projectUrl: "https://www.shadertoy.com/view/XlfGRj",
            description:
                "3D kaliset fractal - volumetric rendering and some tricks.",
            license: item.LICENSE.MIT,
            changeDisclaimer: true,
            //TODO change image
            imageUrl: "img/templates/StarField.png"
        };

        this.path = "material";
        this.__item = item;
    }

    __setUpGUI = folder => {
        const i = this.__item;
        i.addController(folder, this, "brightenToAudio");
        i.addController(folder, this, "brightness");
        i.addController(folder, this, "brightenMultipler");
        
        i.addController(folder, this.uniforms.iterations, "value", 1, 50)
            .name("Iterations");
        i.addController(folder, this.uniforms.formuparam, "value", {path: "formuparam"}).name("formuparam");
        i.addController(folder, this.uniforms.volsteps, "value", {path: "volsteps"}).name("volsteps");
        i.addController(folder, this.uniforms.stepsize, "value", {path: "stepsize"}).name("stepsize");
        i.addController(folder, this.uniforms.zoom, "value", {path: "zoom"}).name("zoom");
        i.addController(folder, this.uniforms.tile, "value", {path: "tile"}).name("tile");
        i.addController(folder, this.uniforms.speed, "value", {path: "speed"}).name("speed");
        i.addController(folder, this.uniforms.brightness, "value", {path: "brightness"}).name("brightness");
        i.addController(folder, this.uniforms.darkmatter, "value", {path: "darkmatter"}).name("darkmatter");
        i.addController(folder, this.uniforms.distfading, "value", {path: "distfading"}).name("distfading");
        i.addController(folder, this.uniforms.saturation, "value", {path: "saturation"}).name("saturation");
        this.impactAnalyser = new ImpactAnalyser(folder, i);
        this.impactAnalyser.endBin = 60;
        this.impactAnalyser.deltaDecay = 20;
        this.folder = folder;
        return folder;
    };

    updateMaterial = (time, dt, audioData, shouldIncrement) => {
        this.uniforms.iTime.value = time;
        if (this.brightenToAudio && this.impactAnalyser) {
            const impact = this.impactAnalyser.analyse(audioData.frequencyData);
            this.uniforms.spe.value =
                this.brightness + impact * this.brightenMultipler * -0.0005;
        }
    };
}
