import { Assets } from 'pixi.js';
import { manifest } from '../game/assets';

export class Loader {
    static async loadAll() {
        await Assets.init({ manifest: manifest });

        const bundleIds = manifest.bundles.map(bundle => bundle.name);

        const List = await Assets.loadBundle(bundleIds);
        return List
    }
}
