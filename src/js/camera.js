function clamp(value, min, max) {
    if (value < min) return min;
    else if (value > max) return max;
    return value;
}

/**************************************************
 * Klasse: Camera
 * entity (entity die gevolgd wordt)
 **************************************************/
export class Camera {
    constructor(entity) {
        this.entity = entity;

        this.minX = 0;
        this.minY = 0;
        this.maxX = 10000;
        this.maxY = 10000;
    }

    render(ctx) {
        let camX = clamp(
            this.entity.x - 1025 / 2,
            this.minX,
            this.maxX - 1025 / 2
        );
        let camY = clamp(
            this.entity.y - 725 / 2,
            this.minY,
            this.maxY - 725 / 2
        );

        ctx.translate(-camX, -camY);
    }
}
