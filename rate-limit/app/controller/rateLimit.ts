import { Controller } from 'egg';

export default class RateLimitController extends Controller {
    public async fixedWindow() {
        const { ctx } = this;
        ctx.body = 'success: fixedWindow example.';
    }

    public async slidingWindow() {
        const { ctx } = this;
        ctx.body = 'success: slidingWindow example.';
    }

    public async leakyBucket() {
        const { ctx } = this;
        ctx.body = 'success: leakyBucket example.';
    }

    public async tokenBucket() {
        const { ctx } = this;
        ctx.body = 'success: tokenBucket example.';
    }
}
