<!--
	前端采集器展示数据
-->
<template>
	<div>
		<div id="chartLineBox" style="width: 90%;height: 400px;text-align: center;margin-top: 40px;"></div>
	</div>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {

			}
		},
		mounted() {
			this.drawEcharts();
		},
		methods: {
			//初始化图表
			drawEcharts() {
				var time = new Date();
				this.chartLine = this.$echarts.init(document.getElementById('chartLineBox'));
				//this.chartLine = this.$echarts.init(document.getElementById('chartLineBox'), 'dark');
				// 指定图表的配置项和数据
				var option = {
					xAxis: {
						type: 'category',
						data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: [720, 832, 801, 834, 1190, 1230, 1220],
						type: 'line',
						smooth: true
					},
					{
						data: [820, 932, 901, 934, 1290, 1330, 1320],
						type: 'line',
						smooth: true
					},
					{
						data: [820, 932, 901, 934, 1290, 1330, 1320],
						type: 'line',
						smooth: true
					}]
				};
				// 使用刚指定的配置项和数据显示图表。
				this.chartLine.setOption(option);
			},
		},
	}
</script>

<style>

</style>
