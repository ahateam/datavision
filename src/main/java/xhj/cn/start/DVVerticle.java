package xhj.cn.start;

import io.vertx.core.Vertx;
import zyxhj.core.controller.TestController;
import zyxhj.flow.service.FlowService;
import zyxhj.utils.Singleton;
import zyxhj.utils.ZeroVerticle;

public class DVVerticle extends ZeroVerticle {

	public static void main(String[] args) {
		Vertx vertx = Vertx.vertx();
		vertx.deployVerticle(new DVVerticle());
	}

	public String name() {
		return "dv";
	}

	public int port() {
		return 8093;
	}

	protected void init() throws Exception {

		initCtrl(ctrlMap, Singleton.ins(TestController.class, "test"));

		initCtrl(ctrlMap, Singleton.ins(FlowService.class, "flow"));

	}

}
