package xhj.cn.start;

import io.vertx.core.Vertx;
import zyxhj.core.controller.TestController;
import zyxhj.core.service.TagService;
import zyxhj.flow.service.AnnexService;
import zyxhj.flow.service.FlowService;
import zyxhj.flow.service.ProcessService;
import zyxhj.flow.service.ReportService;
import zyxhj.flow.service.TableService;
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
		
		initCtrl(ctrlMap, Singleton.ins(AnnexService.class, "annex"));	
		
		initCtrl(ctrlMap, Singleton.ins(TableService.class, "table"));	
		
		initCtrl(ctrlMap, Singleton.ins(TagService.class, "tag"));	
		
		initCtrl(ctrlMap, Singleton.ins(ReportService.class, "report"));
		
		initCtrl(ctrlMap, Singleton.ins(ProcessService.class, "process"));	

		initCtrl(ctrlMap, Singleton.ins(ProcessService.class, "process"));

	}

}
