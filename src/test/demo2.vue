<!--
	连接到mqtt服务器
-->
<!-- <template>
	<div>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
	<font>mqtt</font>
	</div>
</template>

<script>
	import mqtt from 'mqtt'
	  var client
	  const options = {
	    connectTimeout: 40000,
	    clientId: 'mqtitId-Home',
	    username: 'admin',
	    password: 'admin',
	    clean: true
	  }
      //使用websocket连接mqtt服务器，注意RabbitMQ启用WEB MQTT插件
	  client = mqtt.connect('ws://10.12.8.172:15675/ws', options)
	 //安装 npm install mqtt --save
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		created() {
		  
		},
		onLoad() {
			
		},
		mounted() {
			this.mqttMsg();
			console.log('执行');
		},
		methods: {
			mqttMsg() {
				client.on('connect', (e) => {
				  console.log("连接成功！！！")
				  client.subscribe('iotgateway', { qos: 0 }, (error) => {
					if (!error) {
					  console.log('订阅成功')
					} else {
					  console.log('订阅失败')
					}
				  })
	
			})
	        // 接收消息处理
	        client.on('message', (topic, message) => {
	          console.log('收到来自', topic, '的消息', message.toString())
	          this.msg = message.toString()
	        })
	      }
		}
	}
</script> -->