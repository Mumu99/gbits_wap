<template>
  <div class="container">
    <!-- 头部 -->
    <header id="head">
      <img
        src="../../assets/images/kv.jpg"
        width="100%"
      >
    </header>
    <!-- 列表 -->
    <div
      class="top"
      id="top"
    >
      <!-- 第一层 -->
      <ul class="oneList">
        <li
          v-for="(item,index) in fList"
          :key="index"
          :class="{active:currentIndex === index}"
          @click="selectInfo(index,item)"
        >{{item.name}}</li>
      </ul>
      <!-- 第二层 -->
      <ul
        class="list"
        v-if="fList[currentIndex]"
      >
        <li
          v-for="(item,index) in fList[currentIndex].child"
          :key="index"
          :class="{active:currentTwo===index}"
          class="van-hairline--surround"
          @click="selectTwo(index)"
        >
          {{item.name}}
        </li>
      </ul>
      <!-- 搜索 -->
      <div class="sech">
        <Search
          v-model="value"
          placeholder="请输入搜索关键词"
          background="#1f1a17"
          show-action
          @search="onSearch"
          class="search"
        >
          <template
            #action
            class="search-v"
          >
            <div
              @click="onSearch"
              style="color:#fff7c2 "
            >搜索</div>
          </template>
        </Search>
        <Button
          icon="plus"
          size="small"
          style="color: #2a2522;background-color: #e1c78e;"
          class="add"
          @click="showPopup('add')"
          data-stat="{key:'111', act: 'click'}"
        >新增资料</Button>
      </div>
    </div>
    <!-- 下面展示区域 -->
    <div
      class="btn"
      id="btn"
      v-if="fList[currentIndex]"
    >
      <!-- 展示列表-身份 -->
      <ul
        class="btn-content"
        v-if="fList[currentIndex].name==='身份'"
      >
        <!-- top -->
        <li
          class=" top-title top-title1 van-hairline--top"
          id="top-title"
        >
          <div
            v-for="(item,index) in fList[currentIndex].header"
            :key="index"
          >
            {{item}}
          </div>
          <div>版本记录</div>
        </li>
        <!-- 主体内容 -->
        <div
          class="li-content"
          id="li-content"
        >
          <li
            v-for="(item,index) in fList[currentIndex].child[currentTwo].child"
            :key="index"
            class="van-hairline--top"
          >
            <!-- 主要内容 -->
            <div class="content">
              <!-- 编辑 -->
              <p class="van-hairline--right item-1">
                <Icon
                  size="22px"
                  name="records"
                  color="#dec98a"
                  @click="showPopup(item,'身份')"
                />
              </p>
              <!-- 道具名称 -->
              <p class="name van-hairline--right item-3">{{item.title}}</p>
              <!-- 装备介绍 -->
              <div
                class="main van-hairline--right  item-6"
                style="text-align:center"
                v-if="!item.isdesc"
                v-html="item.info"
              >
                {{item.info}}
              </div>
              <div
                class="main van-hairline--right  item-6"
                v-else
              >
                <p
                  v-for="(item,index) in item.info"
                  :key="index"
                >
                  <span class="desc-title">{{item.equip}}: </span>
                  <span class="desc-content">{{item.desc}}</span>
                </p>
              </div>
              <!-- 五维属性 -->
              <div class="van-hairline--right item-4">
                <img
                  :src="item.nature"
                  alt=""
                  width="45px"
                  height="45px"
                >
              </div>
              <!-- 版本记录 -->
              <div class="item-bb">
                <p
                  v-for="(log,index) in item.log"
                  :key="index"
                >{{log}}</p>
              </div>
            </div>
          </li>
        </div>
      </ul>
      <!-- 展示列表-防具装备 -->
      <ul
        class="btn-content"
        v-if="fList[currentIndex].name==='防具装备'"
      >
        <!-- top -->
        <li class="top-title top-title2 van-hairline--top" id="topTitle">
          <div
            v-for="(item,index) in fList[currentIndex].header"
            :key="index"
          >
            {{item}}
          </div>
          <div>版本记录</div>
        </li>
        <!-- 主体内容 -->
        <div
          class="li-content"
          id="li-content"
        >
          <li
            v-for="(item,index) in fList[currentIndex].child[currentTwo].child"
            :key="index"
            class="van-hairline--top"
          >
            <!-- 主要内容 -->
            <div class="content" id="content">
              <!-- 编辑 -->
              <p class="van-hairline--right item-1" >
                <Icon
                  size="22px"
                  name="records"
                  color="#dec98a"
                  @click="showPopup(item,'防具装备')"
                />
              </p>
              <!-- ICON -->
              <div class="van-hairline--right" style="padding: 0 .5rem">
                <img
                  :src="item.icon"
                  alt=""
                  width="45px"
                  height="45px"
                >
              </div>
              <!-- 道具名称 -->
              <p class="name van-hairline--right item-3">{{item.title}}</p>
              <!-- 可出现词条 -->
              <div class="item-7 van-hairline--right" style="text-align:left" v-html="item.word">
                {{item.word}}
              </div>
              <!-- 版本记录 -->
              <div class="item-bb">
                <p
                  v-for="(log,index) in item.log"
                  :key="index"
                >{{log}}</p>
              </div>
            </div>
          </li>
        </div>
      </ul>
      <!-- 展示列表-武器库 -->
      <ul
        class="btn-content"
        v-if="fList[currentIndex].name==='武器库'"
      >
        <!-- top -->
        <li class="top-title top-title3 van-hairline--top">
          <div
            v-for="(item,index) in fList[currentIndex].header"
            :key="index"
          >
            {{item}}
          </div>
          <div>版本记录</div>
        </li>
        <!-- 主体内容 -->
        <div
          class="li-content"
          id="li-content"
        >
          <li
            v-for="(item,index) in fList[currentIndex].child[currentTwo].child"
            :key="index"
            class="van-hairline--top"
          >
            <!-- 主要内容 -->
            <div class="content">
              <!-- 编辑 -->
              <p class="van-hairline--right item-1">
                <Icon
                  size="22px"
                  name="records"
                  color="#dec98a"
                  @click="showPopup(item,'武器库')"
                />
              </p>
              <!-- ICON -->
              <div class="van-hairline--right" style="padding: 0 .5rem">
                <img
                  :src="item.icon"
                  alt=""
                  width="45px"
                  height="45px"
                >
              </div>
              <!-- 道具名称 -->
              <p class="name van-hairline--right item-3">{{item.title}}</p>
              <!-- 装备介绍 -->
              <div class="main van-hairline--right  item-6" style="" v-html="item.info">
                {{item.info}}
              </div>
              <!-- 可出现词条 -->
              <div class="item-7 van-hairline--right"  style="text-align:left" v-html="item.word">
                {{item.word}}
              </div>
              <!-- 版本记录 -->
              <div class="item-bb">
                <p
                  v-for="(log,index) in item.log"
                  :key="index"
                >{{log}}</p>
              </div>
            </div>
          </li>
        </div>
      </ul>
      <!-- 展示列表-怪物神鉴 -->
      <ul
        class="btn-content"
        v-if="fList[currentIndex].name==='万神图鉴'"
      >
        <!-- top -->
        <li class="top-title top-title4-2 van-hairline--top">
          <div
            v-for="(item,index) in fList[currentIndex].header"
            :key="index"
          >
            {{item}}
          </div>
          <div>版本记录</div>
        </li>
        <!-- 主体内容 -->
        <div
          class="li-content"
          id="li-content"
        >
          <li
            v-for="(item,index) in fList[currentIndex].child[currentTwo].child"
            :key="index"
            class="van-hairline--top"
          >
            <!-- 主要内容 -->
            <div class="content">
              <!-- 编辑 -->
              <p class="van-hairline--right item-1">
                <Icon
                  size="22px"
                  name="records"
                  color="#dec98a"
                  @click="showPopup(item,'怪物神鉴')"
                />
              </p>
              <!-- ICON -->
              <!-- <div class="van-hairline--right" style="padding: 0 .5rem">
                <img
                  :src="item.icon"
                  alt=""
                  width="45px"
                  height="45px"
                >
              </div> -->
                <!-- 包库点 -->
              <p class="name van-hairline--right item-3">{{item.treasure}}</p>
              <!-- 道具名称 -->
              <p class="name van-hairline--right item-3">{{item.title}}</p>
              <!-- 装备介绍 -->
              <div
                class="item-6 van-hairline--right"
                v-if="!item.isdesc"
                style="" v-html="item.info"
              >
                {{item.info}}
              </div>
              <!-- 版本记录 -->
              <div class="item-bb">
                <p
                  v-for="(log,index) in item.log"
                  :key="index"
                >{{log}}</p>
              </div>
            </div>
          </li>
        </div>
      </ul>
      <!-- 展示列表-属性 -->
      <ul
        class="btn-content"
        v-if="fList[currentIndex].name==='属性'"
      >
        <!-- top -->
        <li class="top-title top-title4-3 van-hairline--top">
          <div
            v-for="(item,index) in fList[currentIndex].header"
            :key="index"
          >
            {{item}}
          </div>
          <div>版本记录</div>
        </li>
        <!-- 主体内容 -->
        <div
          class="li-content"
          id="li-content"
        >
          <li
            v-for="(item,index) in fList[currentIndex].child[currentTwo].child"
            :key="index"
            class="van-hairline--top"
          >
            <!-- 主要内容 -->
            <div class="content">
              <!-- 编辑 -->
              <p class="van-hairline--right item-1">
                <Icon
                  size="22px"
                  name="records"
                  color="#dec98a"
                  @click="showPopup(item,'属性')"
                />
              </p>
                <!-- 道具名称 -->
              <p class="name van-hairline--right item-3">{{item.title}}</p>
              <!-- 装备介绍 -->
              <div
                class="item-6 van-hairline--right"
                v-if="!item.isdesc"
                style="" v-html="item.info"
              >
                {{item.info}}
              </div>
              <!-- 版本记录 -->
              <div class="item-bb">
                <p
                  v-for="(log,index) in item.log"
                  :key="index"
                >{{log}}</p>
              </div>
            </div>
          </li>
        </div>
      </ul>
      <!-- 展示列表-神格 -->
      <ul
        class="btn-content"
        v-if="fList[currentIndex].name==='神格'"
      >
        <!-- top -->
        <li class="top-title top-title4 van-hairline--top">
          <div
            v-for="(item,index) in fList[currentIndex].header"
            :key="index"
          >
            {{item}}
          </div>
          <div>版本记录</div>
        </li>
        <!-- 主体内容 -->
        <div
          class="li-content"
          id="li-content"
        >
          <li
            v-for="(item,index) in fList[currentIndex].child[currentTwo].child"
            :key="index"
            class="van-hairline--top"
          >
            <!-- 主要内容 -->
            <div class="content">
              <!-- 编辑 -->
              <p class="van-hairline--right item-1">
                <Icon
                  size="22px"
                  name="records"
                  color="#dec98a"
                  @click="showPopup(item,'神格')"
                />
              </p>
              <!-- ICON -->
              <div class="van-hairline--right" style="padding: 0 .5rem">
                <img
                  :src="item.icon"
                  alt=""
                  width="45px"
                  height="45px"
                >
              </div>
                <!-- 道具名称 -->
              <p class="name van-hairline--right item-3">{{item.title}}</p>
              <!-- 装备介绍 -->
              <div
                class="item-6 van-hairline--right"
                v-if="!item.isdesc"
                style="" v-html="item.info"
              >
                {{item.info}}
              </div>
              <!-- 版本记录 -->
              <div class="item-bb">
                <p
                  v-for="(log,index) in item.log"
                  :key="index"
                >{{log}}</p>
              </div>
            </div>
          </li>
        </div>
      </ul>
      <!-- 展示列表-符文之语 -->
      <ul
        class="btn-content"
        v-if="fList[currentIndex].name==='符文'"
      >
        <!-- top -->
        <li class="top-title top-title5 van-hairline--top">
          <div
            v-for="(item,index) in fList[currentIndex].header"
            :key="index"
          >
            {{item}}
          </div>
          <div>版本记录</div>
        </li>
        <!-- 主体内容 -->
        <div
          class="li-content"
          id="li-content"
        >
          <li
            v-for="(item,index) in fList[currentIndex].child[currentTwo].child"
            :key="index"
            class="van-hairline--top"
          >
            <!-- 主要内容 -->
            <div class="content">
              <!-- 编辑 -->
              <p class="van-hairline--right item-1">
                <Icon
                  size="22px"
                  name="records"
                  color="#dec98a"
                  @click="showPopup(item,'符文之语')"
                />
              </p>
              <!-- 道具名称 -->
              <p class="name van-hairline--right item-3">{{item.title}}</p>
              <!-- 排序 -->
              <div
                style="width:60px"
                class="van-hairline--right"
              >{{item.number}}</div>
              <!-- 装备介绍 -->
              <div
                class="item-6 van-hairline--right"
                v-if="!item.isdesc"
                style="" v-html="item.info"
              >
                {{item.info}}
              </div>
              <div
                class="item-6 van-hairline--right"
                v-else
              >
                <p
                  v-for="(item,index) in item.info"
                  :key="index"
                >
                  <span class="desc-title">{{item.equip}}: </span>
                  <span class="desc-content">{{item.desc}}</span>
                </p>
              </div>
              <!-- 版本记录 -->
              <div class="item-bb">
                <p
                  v-for="(log,index) in item.log"
                  :key="index"
                >{{log}}</p>
              </div>
            </div>
          </li>
        </div>
      </ul>
      <!-- 展示列表-词缀 -->
      <ul
        class="btn-content"
        v-if="fList[currentIndex].name==='词缀'"
      >
        <!-- top -->
        <li class="top-title top-title6 van-hairline--top">
          <div
            v-for="(item,index) in fList[currentIndex].header"
            :key="index"
          >
            {{item}}
          </div>
          <div>版本记录</div>
        </li>
        <!-- 主体内容 -->
        <div
          class="li-content"
          id="li-content"
        >
          <li
            v-for="(item,index) in fList[currentIndex].child[currentTwo].child"
            :key="index"
            class="van-hairline--top"
          >
            <!-- 主要内容 -->
            <div class="content">
              <!-- 编辑 -->
              <p class="van-hairline--right item-1">
                <Icon
                  size="22px"
                  name="records"
                  color="#dec98a"
                  @click="showPopup(item,'词缀')"
                />
              </p>
              <!-- 道具名称 -->
              <p class="name van-hairline--right item-3">{{item.title}}</p>
              <!-- 武器类别 -->
              <p class="name van-hairline--right item-3">{{item.weapon_type}}</p>
              <!-- 装备介绍 -->
              <div
                class="item-6 van-hairline--right"
                v-if="!item.isdesc"
              >
                {{item.info}}
              </div>
              <!-- 版本记录 -->
              <div class="item-bb">
                <p
                  v-for="(log,index) in item.log"
                  :key="index"
                >{{log}}</p>
              </div>
            </div>
          </li>
        </div>
      </ul>
      <!-- 弹出层 -->
      <Popup
        v-model="show"
        :style="{ width: '95%', height: '90%' }"
        closeable
        class="pop"
      >
        <p class="title">{{isAdd ? '资料添加编辑页' : '资料更新编辑页'}}</p>
        <Form
          ref="formRef"
          @submit="onSubmit"
          class="formpop"
        >
          <!-- game -->
          <Field
            v-model="game"
            name="game"
            label="游戏"
            colon
            readonly
            class="bc"
            label-align="right"
          />
          <!-- ID -->
          <Field
            v-model="form.id"
            name="id"
            colon
            label="ID"
            readonly
            label-align="right"
            class="bc"
            v-if="!isAdd"
          />
          <!-- 图片 -->
          <Field
            name="icon"
            label="ICON"
            label-align="right"
            colon
            class="tbc"
            v-if="form.icon"
          >
            <template #input>
              <Uploader
                v-model="form.icon"
                :max-count="1"
                :after-read="afterRead"
                :max-size="2048 * 1024"
                @oversize="onOversize"
              />
            </template>
          </Field>
          <!-- 道具名称 -->
          <Field
            v-if="form.title || personW.title"
            v-model="form.title"
            placeholder="请输入名称"
            name="title"
            label="名称"
            :readonly="isAdd ? false : true"
            label-align="right"
            colon
            class="bc addColor"
            required
            @focus="focus('title')"
            :rules="[{ required: true, message: '请填写名称' }]"
          />
          <!-- 宝库点 -->
          <div
            :class="!isAdd ? 'canWrite' : ''"
            v-if="form.treasure || personW.treasure"
          >
            <Field
              v-model="form.treasure"
              name="treasure"
              label-align="right"
              label="宝库点"
              colon
              show-word-limit
              placeholder="请输入宝库点"
              class="bor"
              @focus="focus('treasure')"
            />
            <div
              class="cw-btn"
              v-if="!isAdd"
              @click="submitdesc('treasure')"
            >
              <Icon
                name="edit"
                size="20px"
              />
              <p>提交</p>
            </div>
          </div>
          <!-- 武器类别 -->
          <div
            :class="!isAdd ? 'canWrite' : ''"
            v-if="form.weapon_type || personW.weapon_type"
          >
            <Field
              v-model="form.weapon_type"
              name="weapon_type"
              label-align="right"
              label="武器类别"
              colon
              show-word-limit
              placeholder="请输入武器类别"
              class="bor"
              @focus="focus('weapon_type')"
            />
            <div
              class="cw-btn"
              v-if="!isAdd"
              @click="submitdesc('weapon_type')"
            >
              <Icon
                name="edit"
                size="20px"
              />
              <p>提交</p>
            </div>
          </div>
          <!-- 介绍 -->
          <div
            :class="!isAdd ? 'canWrite' : ''"
            v-if="form.info || personW.info"
          >
            <Field
              v-model="form.info"
              name="info"
              label-align="right"
              label="介绍"
              rows="3"
              colon
              type="textarea"
              maxlength="400"
              show-word-limit
              placeholder="请输入介绍"
              class="bor"
              @focus="focus('info')"
            />
            <div
              class="cw-btn"
              v-if="!isAdd"
              @click="submitdesc('info')"
            >
              <Icon
                name="edit"
                size="20px"
              />
              <p>提交</p>
            </div>
          </div>
          <!-- 排序 -->
          <div
            :class="!isAdd ? 'canWrite' : ''"
            v-if="form.number || personW.number"
          >
            <Field
              v-model="form.number"
              name="number"
              label="排序"
              label-align="right"
              placeholder="请输入排序"
              colon
              @focus="focus('number')"
            />
            <div
              class="cw-btn"
              v-if="!isAdd"
              @click="submitdesc('number')"
            >
              <Icon
                name="edit"
                size="20px"
              />
              <p>提交</p>
            </div>
          </div>
          <!-- 词条 -->
          <div
            :class="!isAdd ? 'canWrite' : ''"
            v-if="form.word || personW.word"
          >
            <Field
              v-model="form.word"
              name="word"
              label-align="right"
              label="词条"
              rows="3"
              colon
              maxlength="400"
              show-word-limit
              type="textarea"
              placeholder="请输入词条"
              class="bor"
              @focus="focus('word')"
            />
            <div
              class="cw-btn"
              v-if="!isAdd"
              @click="submitdesc('word')"
            >
              <Icon
                name="edit"
                size="20px"
              />
              <p>提交</p>
            </div>
          </div>
          <!-- 兵装效果 -->
          <div
            :class="!isAdd ? 'canWrite' : ''"
            v-if="form.equip || personW.equip"
          >
            <Field
              v-model="form.equip"
              name="equip"
              label-align="right"
              label="兵装"
              rows="3"
              maxlength="120"
              show-word-limit
              colon
              type="textarea"
              placeholder="请输入兵装"
              class="bor"
              @focus="focus('equip')"
            />
            <div
              class="cw-btn"
              v-if="!isAdd"
              @click="submitdesc('equip')"
            >
              <Icon
                name="edit"
                size="20px"
              />
              <p>提交</p>
            </div>
          </div>
          <!-- 五维属性 -->
          <div
            :class="!isAdd ? 'canWrite' : ''"
            v-if="form.nature || personW.nature"
          >
            <Field
              name="nature"
              label="五维属性"
              label-align="right"
              colon
              class="tbc"
              v-if="form.nature"
            >
              <template #input>
                <Uploader
                  v-model="form.nature"
                  :max-count="1"
                  :after-read="afterRead"
                  :max-size="2048 * 1024"
                  @oversize="onOversize"
                />
              </template>
            </Field>
            <div
              class="cw-btn"
              v-if="!isAdd"
              @click="submitdesc('nature')"
            >
              <Icon
                name="edit"
                size="20px"
              />
              <p>提交</p>
            </div>
          </div>
          <!-- 按钮 -->
          <div
            class="form-btn"
            v-if="isAdd"
          >
            <Button
              class="btn-item"
              @click="closeAdd"
              native-type="button"
            >放弃编辑</Button>
            <Button
              class="btn-item"
              @click="onSubmit"
            >创建资料</Button>
          </div>
        </Form>
      </Popup>
    </div>
  </div>
</template>

<script>
import { Search, Icon, Button, Popup, Form, Field, Uploader, Toast, Dialog } from 'vant'
import throttle from 'lodash/throttle'
export default {
  name: 'HomeIndex',
  components: {
    //注册组件
    Search,
    Icon,
    Button,
    Popup,
    Form,
    Field,
    Uploader,
    Toast,
    Dialog
  },
  data () {
    return {
      fList: [], // 上
      fListT: [],
      btnlist: [], // 下
      currentIndex: 0, // 第一个列表展示 高亮
      currentTwo: 0, // 第二个列表展示高亮
      value: '', // 输入框的内容
      show: false, // 是否展示弹出层(修改)
      showadd: false, // 是否展示弹出层(新增)
      game: '不朽之旅', // form表单名字
      form: {},
      itemdesc: '', // 当前点击的元素
      itementry: '', // 当前点击的元素
      itemsoldier: '', // 当前点击的元素
      attribute: '', // 当前点击的元素展示
      treasure: '', // 宝库点
      weapon_type: '', // 武器类别
      sort: '', // 当前点击的元素展示
      isAdd: false, // 判读是不是add
      personW: {},
      fileName: '',
      loginmsg: '',
      first_tags: '身份',
      isEdit: true // 是否为下载还是编辑
    }
  },
  methods: {
    // 搜索框
    onSearch () {
      const { first_tags, value } = this
      value.trim() ? this.Osearch(first_tags, value) : this.getlist()

    },
    // 搜索异步action
    async Osearch (first_tags, value) {
      let sdata = {
        first_tags,
        keyword: value
      };
      await this.$API.reqSerch(sdata).then(a => {
        this.fList = a.data
      })
    },
    // 自适应高度
    setHeight () {
      this.$nextTick(() => {
        // 函数体
        let t = document.getElementById("top").clientHeight
        let b = document.body.clientHeight
        let lHeight = ((b - t) - 32)
        document.getElementById("li-content").style.height = lHeight + 'px'
      })
    },
    // 一级点击
    selectInfo (index, item) {
      // 调用数据
      this.fList = this.fListT
      if (item.formlist.nature === '') {
        item.formlist.nature = []
      }
      this.first_tags = item.name
      this.form = item.formlist
      console.log(this.form)
      // this.setHeight()
      if (index === this.currentIndex) return
      this.currentIndex = index
      this.currentTwo = 0
      // 清空输入框
      this.value = ""
    },
    // 二级点击
    selectTwo (index) {
      if (index === this.currentTwo) return false
      this.currentTwo = index
      // document.getElementById('li-content').scrollTop = 0
    },
    showPersonW (item) {
      let personws = {}
      for (var key in item) {
        personws[key] = key
      }
      this.personW = personws
    },
    // 点击修改按钮进入的回调
    switchText (item, text) {
      const { id, icon, title, info, word, equip, number, nature, treasure, weapon_type } = item
      switch (text) {
        case '身份':
          this.form = {
            id,
            title,
            info,
            nature: [{
              url: nature,
              isImage: true
            }],
          }
          this.showPersonW(this.form)
          break;
        case '防具装备':
          this.form = {
            id,
            icon: [{
              url: icon,
              isImage: true
            }],
            title,
            word
          }
          this.showPersonW(this.form)
          break;
        case '武器库':
          this.form = {
            id,
            icon: [{
              url: icon,
              isImage: true
            }],
            title,
            info,
            word
          }
          this.showPersonW(this.form)
          break;
        case '怪物神鉴':
          this.form = {
            id,
            title,
            treasure,
            info
          }
          this.showPersonW(this.form)
          break;
        case '属性':
          this.form = {
            id,
            title,
            info
          }
          this.showPersonW(this.form)
          break;
        case '神格':
          this.form = {
            id,
            icon: [{
              url: icon,
              isImage: true
            }],
            title,
            info
          }
          this.showPersonW(this.form)
          break;
        case '符文之语':
          this.form = {
            id,
            title,
            number,
            info
          }
          this.showPersonW(this.form)
          break;
        case '词缀':
          this.form = {
            id,
            title,
            weapon_type,
            info
          }
          this.showPersonW(this.form)
          break;

        default:
          break;
      }

    },
    // 异步分发action
    async getlist () {
      await this.$API.reqGetWikis().then(a => {
        const { code, data } = a
        if(code === 401){
          this.refToken()
          return false
        }
        this.fList = data
        this.fListT = data
        this.isEdit = data[0].is_edit
        // this.game = a.game 名字
        this.form = {
          "title": "",
          "info": "",
          "nature": []
        }
        this.setHeight()
      })
    },
    // 展示弹出层(修改/新增)
    showPopup (item, text) {
      let weichart = this.is_weixn()
      let app = this.is_app()
      console.log('能否编辑',this.isEdit)
      console.log('是否是微信',weichart)
      console.log('是否是app',!app)
      if(!app && !weichart){
          console.log(2222)
          Dialog.confirm({
          message: '请前往官方社区《雷霆村》进行编辑',
          confirmButtonText: '立即前往'
        })
          .then(() => {
            window.location.href = "http://ltc.leiting.com/web-landscape/index.html"
          })
          .catch(() => {
          });
        return
      }else if(weichart && this.isEdit === 0){
          Dialog.confirm({
          message: '请前往官方社区《雷霆村》进行编辑',
          confirmButtonText: '立即前往'
        })
          .then(() => {
            window.location.href = "http://ltc.leiting.com/web-landscape/index.html"
          })
          .catch(() => {
          });
        return
      } else {
        if (item === 'add') {
          // 新增
          // 修改为添加状态
          this.isAdd = true
          // 得到的数据
          this.personW = {}
          let addForm = {}
          for (var key in this.form) {
            addForm[key] = ""
            this.personW[key] = key
            if (this.personW[key] === 'name') {
              this.personW[key] = 'title'
            }
          }
          if (addForm.icon === '') {
            addForm.icon = []
          }
          if (addForm.nature === '') {
            addForm.nature = []
          }
          console.log(addForm)
          this.$nextTick(() => {
            this.form = addForm
          })
          // 埋点
          // window.parent.track('bxzl_add_data')
          // app.track('bxzl_add_data')
        } else {
          // 回显数据
          this.itemdesc = item.info
          this.itementry = item.word
          this.itemsoldier = item.equip
          this.sort = item.number
          this.attribute = item.nature
          this.treasure = item.treasure
          this.weapon_type = item.weapon_type
          // 设置为修改状态
          this.isAdd = false
          const { id, icon, name, info, word, equip, number, nature, treasure, weapon_type } = item
          this.switchText(item, text)
          // 埋点
          // window.parent.track('bxzl_update_data')
          // app.track('bxzl_update_data')
        }
        // 清空验证
        this.$nextTick(() => {
          // 展示弹窗
          this.show = true;
          setTimeout(() => {
            this.$refs.formRef.resetValidation()
          }, 0);
        })
      }
    },
    // 表单提交
    onSubmit (values) {
      if (values.game) {
        const tid = this.fList[this.currentIndex].child[this.currentTwo].id
        const cValue = values
        for (const key in cValue) { // 去除对象内多余的空值key
          if (cValue[key] === '') {
            delete cValue[key]
          }
          if (key === 'icon') {
            cValue[key] = this.fileName
          }
          if (key === 'nature') {
            cValue[key] = this.fileName
          }
        }
        const data = {
          tid,
          ...cValue
        }
        this.addWiki(data).then(() => {
          Toast.success({
            message: '提交成功, 结果会通过雷村邮箱发送',
            forbidClick: true,
            onOpened: () => {
              // 成功的回调
              this.closeAdd()
            }
          });
        }, () => { })
      }
    },
    // 文件上传完毕之后
    afterRead (file) {
      this.upload(file.file)
    },
    async upload (file) {
      let params = new FormData()
      params.append('file', file)
      await this.$API.reqUpload(params).then(a => {
        this.fileName = a.data
      })
    },
    // 图片过大
    onOversize () {
      Toast.fail({
        message: '文件大小不能超过 2MB'
      });
    },
    // 异步分发action, 新增数据
    async addWiki (data) {
      await this.$API.reqAddWiki(data).then(a => { console.log(a) })
    },
    // 关闭
    closeAdd () {
      this.show = false
    },
    // 提交编辑页数据
    submitdesc: throttle(function (a) {
      let data = {
        tags: a,
        detail: this.itemdesc,
        wid: this.form.id
      }
      this.editWiki(a, this.form.info, this.form.id)
    }, 2000),
    // 更新数据
    async editWiki (tags, detail, wid) {
      let fdata = {
        tags,
        detail,
        wid
      };
      switch (tags) {
        case 'info':
          if (this.form.info === this.itemdesc) {
            Toast.fail({
              message: '需要更新内容才能提交',
              forbidClick: true
            });
          } else if (this.form.info.trim() === "") {
            Toast.fail({
              message: '需要书写内容才能提交',
              forbidClick: true
            });
          } else {
            this.itemdesc = this.form.info
            fdata = {
              tags,
              detail: this.itemdesc,
              wid: this.form.id
            };
            await this.$API.reqEditWiki(fdata).then(a => {
              if (a.status) {
                Toast.success({
                  message: '提交成功!\n进度我们会通过雷村邮箱发送.',
                  forbidClick: true,
                  onOpened: () => {
                    // 成功的回调
                    this.itemdesc = this.form.info
                    // this.editWiki(a, this.itemdesc, this.form.id)
                  }
                });
              } else {
                Toast.fail({
                  message: a.msg,
                  forbidClick: true
                });
              }
            })
          }
          break;
        case 'word':
          if (this.form.word === this.itementry) {
            Toast.fail({
              message: '需要更新内容才能提交',
              forbidClick: true
            });
          } else if (this.form.word.trim() === "") {
            Toast.fail({
              message: '需要书写内容才能提交',
              forbidClick: true
            });
          } else {
            this.itementry = this.form.word
            fdata = {
              tags,
              detail: this.itementry,
              wid: this.form.id
            };
            await this.$API.reqEditWiki(fdata).then(a => {
              if (a.status) {
                Toast.success({
                  message: '提交成功!\n进度我们会通过雷村邮箱发送.',
                  forbidClick: true,
                  onOpened: () => {
                    // 成功的回调
                    this.itemdesc = this.form.info
                    // this.editWiki(a, this.itemdesc, this.form.id)
                  }
                });
              } else {
                Toast.fail({
                  message: a.msg,
                  forbidClick: true
                });
              }
            })
          }
          break;
        case 'equip':
          if (this.form.equip === this.itemsoldier) {
            Toast.fail({
              message: '需要更新内容才能提交',
              forbidClick: true
            });
          } else if (this.form.equip.trim() === "") {
            Toast.fail({
              message: '需要书写内容才能提交',
              forbidClick: true
            });
          } else {
            this.itemsoldier = this.form.equip
            fdata = {
              tags,
              detail: this.itemsoldier,
              wid: this.form.id
            };
            await this.$API.reqEditWiki(fdata).then(a => {
              if (a.status) {
                Toast.success({
                  message: '提交成功!\n进度我们会通过雷村邮箱发送.',
                  forbidClick: true,
                  onOpened: () => {
                    // 成功的回调
                    this.itemdesc = this.form.info
                    // this.editWiki(a, this.itemdesc, this.form.id)
                  }
                });
              } else {
                Toast.fail({
                  message: a.msg,
                  forbidClick: true
                });
              }
            })
          }
          break;
        case 'treasure':
          if (this.form.treasure === this.treasure) {
            Toast.fail({
              message: '需要更新内容才能提交',
              forbidClick: true
            });
          } else if (this.form.treasure.trim() === "") {
            Toast.fail({
              message: '需要书写内容才能提交',
              forbidClick: true
            });
          } else {
            this.treasure = this.form.treasure
            fdata = {
              tags,
              detail: this.treasure,
              wid: this.form.id
            };
            await this.$API.reqEditWiki(fdata).then(a => {
              if (a.status) {
                Toast.success({
                  message: '提交成功!\n进度我们会通过雷村邮箱发送.',
                  forbidClick: true,
                  onOpened: () => {
                    // 成功的回调
                    this.treasure = this.form.treasure
                    // this.editWiki(a, this.itemdesc, this.form.id)
                  }
                });
              } else {
                Toast.fail({
                  message: a.msg,
                  forbidClick: true
                });
              }
            })
          }
          break;
        case 'weapon_type':
          if (this.form.weapon_type === this.weapon_type) {
            Toast.fail({
              message: '需要更新内容才能提交',
              forbidClick: true
            });
          } else if (this.form.weapon_type.trim() === "") {
            Toast.fail({
              message: '需要书写内容才能提交',
              forbidClick: true
            });
          } else {
            this.weapon_type = this.form.weapon_type
            fdata = {
              tags,
              detail: this.weapon_type,
              wid: this.form.id
            };
            await this.$API.reqEditWiki(fdata).then(a => {
              if (a.status) {
                Toast.success({
                  message: '提交成功!\n进度我们会通过雷村邮箱发送.',
                  forbidClick: true,
                  onOpened: () => {
                    // 成功的回调
                    this.weapon_type = this.form.weapon_type
                    // this.editWiki(a, this.itemdesc, this.form.id)
                  }
                });
              } else {
                Toast.fail({
                  message: a.msg,
                  forbidClick: true
                });
              }
            })
          }
          break;
        case 'number':
          if (this.form.number === this.sort) {
            Toast.fail({
              message: '需要更新内容才能提交',
              forbidClick: true
            });
          } else if (this.form.number.trim() === "") {
            Toast.fail({
              message: '需要书写内容才能提交',
              forbidClick: true
            });
          } else {
            this.sort = this.form.number
            fdata = {
              tags,
              detail: this.sort,
              wid: this.form.id
            };
            await this.$API.reqEditWiki(fdata).then(a => {
              if (a.status) {
                Toast.success({
                  message: '提交成功!\n进度我们会通过雷村邮箱发送.',
                  forbidClick: true,
                  onOpened: () => {
                    // 成功的回调
                    this.itemdesc = this.form.info
                    // this.editWiki(a, this.itemdesc, this.form.id)
                  }
                });
              } else {
                Toast.fail({
                  message: a.msg,
                  forbidClick: true
                });
              }
            })
          }
          break;
        case 'nature':
          if (this.form.nature.length === 0) {
            Toast.fail({
              message: '需要上传图片才能提交',
              forbidClick: true
            });
          } else if (this.form.nature[0].url === this.attribute) {
            Toast.fail({
              message: '需要更新内容才能提交',
              forbidClick: true
            });
          } else {
            this.form.nature[0].url = this.fileName
            // 成功的回调
            this.attribute = this.fileName
            fdata = {
              tags,
              detail: this.attribute,
              wid: this.form.id
            };
            await this.$API.reqEditWiki(fdata).then(a => {
              if (a.status) {
                Toast.success({
                  message: '提交成功!\n进度我们会通过雷村邮箱发送.',
                  forbidClick: true,
                  onOpened: () => {
                    // 成功的回调
                    this.itemdesc = this.form.info
                    // this.editWiki(a, this.itemdesc, this.form.id)
                  }
                });
              } else {
                Toast.fail({
                  message: a.msg,
                  forbidClick: true
                });
              }
            })
          }
          break;

        default:
          break;
      }
    },
    // 编辑输入框动态添加数据
    focus (text) {
      this.personW[text] = text
    },
    // 是否是微信浏览器
    is_weixn () {
      var ua = navigator.userAgent.toLowerCase();
    //   var ua = ';micromessenger';
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    },
    // 是否是app运行
    is_app () {
    //   var ua = navigator.userAgent.toLowerCase();
      var ua = 'sasasasdsadsdsadasdsltcappsasdsdwqwq/sas'
      if (ua.match(/ltcapp/i) == "ltcapp") {
        // alert('ltcapp')
        console.log('ltcapp')
        // console.log(app.getUserToken())
        // const {accessToken, accessTokenValidTime, refreshToken} = JSON.parse(app.getUserToken())
        //  window.localStorage.setItem('accessToken', JSON.stringify(data))
        //  this.getlist()
        return true;
      } else {
        return false;
      }
    },
    // 获取token
    getToken(){
      // console.log(window.parent.getUserToken())
      // const {accessToken, accessTokenValidTime, refreshToken} = window.parent.getUserToken()
      const data = {
        accessToken: 'H4sIAAAAAAAAAKtWyslPz8wLycxNVbIyNLW0NDI0NrQwsTAx1FEqys9J9UxRsjIxsTA10IEoVLIqKSpN1VEqqSwAadBRykwsQdZYCwDYy-VuUQAAAA.hSrIvP0OnzmbUsbMKHE4h42FVBqWEV63sODCpFBJFMK596vSVjLeLlB_8LbhJ6wAIR1GVruPLU0S1pGXtL7Hkw', // 调用接口的token(String)
        accessTokenValidTime: '', // token的到期时间(Number)
        refreshToken: 'H4sIAAAAAAAAAKtWyslPz8wLycxNVbIyNLW0NDIwMTAxMbEw1FEqys9J9UxRsgLyTA10IAqVrEqKSlN1lEoqC0AadJRSKwqAtJmBgamBAVCjjlJmYgmySbUAnPfHOGIAAAA.y65zUY4lTUYfkoYy69VCOwUTK2DZIYzhi9fJu_FTG36WH_DeLPaLlk5I5pRoog99zNAasDKA0BYZRzyPGPXFFg' // 刷新token的token(String)
      }
      window.localStorage.setItem('accessToken', JSON.stringify(data))
      this.getlist()
    },
    // 刷新token
    async refToken(){
      const { refreshToken } = JSON.parse(window.localStorage.getItem('accessToken')) || ''
      console.log(refreshToken)
      const Tdata = {
        reshToken: refreshToken
      }
      await this.$API.refresh(Tdata).then(a=>{
        console.log(a)
        window.localStorage.setItem('accessToken', JSON.stringify(a.data))
        console.log(JSON.parse(window.localStorage.getItem('accessToken')))
        this.getlist()
      })
    }
  },
  mounted () {
    this.getToken()
    this.is_app()
  }
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
.container {
  overflow-y: auto;
  width: 100%;
  height: 100%;
  background-color: #1f1a17;
  .oneList {
    display: grid;
    padding: 10px;
    width: 100%;
    position: relative;
    grid-gap: 10px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    li {
      padding: 6px 0;
      line-height: 12px;
      color: #dec98a;
      text-align: center;
      font-size: 12px;
      background: url('../../assets/images/bc.png') 0 0 no-repeat;
      background-size: 100%;
      &.active {
        font-weight: bold;
        color: #41321f;
        background: url('../../assets/images/bc-active.png') 0 0 no-repeat;
        background-size: 100%;
      }
    }
    &::after {
      position: absolute;
      bottom: 0;
      left: 0;
      content: '';
      width: 80%;
      left: 10%;
      height: 1px;
      background-image: linear-gradient(
        -90deg,
        #1f1a17 0%,
        #f1c01e 10%,
        #fbd96c 15%,
        #fff4c4 50%,
        #fbd96c 85%,
        #f1c01e 90%,
        #1f1a17 100%
      );
    }
  }
  .sech {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .search {
      width: 70%;
      /deep/.van-search__content {
        background-color: #3d3832;
        .van-icon {
          color: #fff7c2;
        }
        .van-field__control {
          color: #ddbb69;
        }
      }
      /deep/ .van-search__action:active {
        background-color: #1f1a17;
      }
    }
    .add {
      margin-right: 5px;
    }
  }
  .list {
    padding: 10px 5px;
    display: grid;
    width: 100%;
    grid-gap: 10px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    li {
      padding: 7px 0;
      color: #9f9375;
      text-align: center;
      font-size: 12px;
      background-color: #46422e;
      &.active {
        font-weight: bold;
        color: #ddbb69;
      }
    }
  }
  .top-title {
    width: 100%;
    display: flex;
    text-align: center;
    font-size: 12px;
    color: #dec98a;
    font-weight: bold;
    padding: 10px 5px;
    background-color: #444444;
    div {
      text-align: center;
    }
  }
  .top-title1 {
    div:nth-child(1) {
      width: 30px;
    }
    div:nth-child(2) {
      width: 85px;
    }
    div:nth-child(3) {
      width: 190px;
    }
    div:nth-child(4) {
      width: 85px;
    }
    div:nth-child(5) {
      width: 300px;
    }
  }
  .top-title2 {
    div:nth-child(1) {
      width: 30px;
    }
    div:nth-child(2) {
      width: 70px;
    }
    div:nth-child(3) {
      width: 85px;
    }
    div:nth-child(4) {
      width: 200px;
    }
    div:nth-child(5) {
      width: 300px;
    }
  }
  .top-title3 {
    div:nth-child(1) {
      width: 30px;
    }
    div:nth-child(2) {
      width: 67px;
    }
    div:nth-child(3) {
      width: 85px;
    }
    div:nth-child(4) {
      width: 190px;
    }
    div:nth-child(5) {
      width: 200px;
    }
    div:nth-child(6) {
      width: 300px;
    }
  }
  .top-title4 {
    div:nth-child(1) {
      width: 30px;
    }
    div:nth-child(2) {
      width: 67px;
    }
    div:nth-child(3) {
      width: 85px;
    }
    div:nth-child(4) {
      width: 190px;
    }
    div:nth-child(5) {
      width: 300px;
    }
  }
  .top-title4-2 {
    div:nth-child(1) {
      width: 30px;
    }
    div:nth-child(2) {
      width: 85px;
    }
    div:nth-child(3) {
      width: 85px;
    }
    div:nth-child(4) {
      width: 190px;
    }
    div:nth-child(5) {
      width: 300px;
    }
  }
  .top-title4-3 {
    div:nth-child(1) {
      width: 30px;
    }
    div:nth-child(2) {
      width: 85px;
    }
    div:nth-child(3) {
      width: 190px;
    }
    div:nth-child(4) {
      width: 300px;
    }
  }
  .top-title5 {
    div:nth-child(1) {
      width: 30px;
    }
    div:nth-child(2) {
      width: 85px;
    }
    div:nth-child(3) {
      width: 60px;
    }
    div:nth-child(4) {
      width: 190px;
    }
    div:nth-child(5) {
      width: 300px;
    }
  }
  .top-title6 {
    div:nth-child(1) {
      width: 30px;
    }
    div:nth-child(2) {
      width: 85px;
    }
    div:nth-child(3) {
      width: 85px;
    }
    div:nth-child(4) {
      width: 190px;
    }
    div:nth-child(5) {
      width: 300px;
    }
  }
  .btn {
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    .btn-content {
      width: 100%;
      min-width: max-content;
      .li-content {
        width: 100%;
        overflow-y: scroll;
      }
      li {
        width: 100%;
        .write-button {
          height: 100%;
        }
        .content {
          width: 100%;
          display: flex;
          text-align: center;
          font-size: 12px;
          color: #a29fa3;
          padding: 10px 5px;
          align-items: center;
          .item-1,
          .item-2,
          .item-3,
          .item-4,
          .item-5,
          .item-6,
          .item-7,
          .item-8,
          .item-9,
          .item-bb {
            padding: 5px;
          }
          .item-1 {
            width: 30px;
          }
          .item-2 {
            width: 60px;
          }
          .item-3 {
            width: 85px;
          }
          .item-4 {
            width: 85px;
          }
          .item-5 {
            width: 85px;
          }
          .item-6 {
            width: 190px;
          }
          .item-7 {
            width: 200px;
          }
          .item-8 {
            width: 300px;
          }
          .item-9 {
            width: 300px;
          }
          .item-bb {
            width: 300px;
            line-height: 16px;
            height: 50px;
            overflow-y: scroll;
          }
          img {
            margin-left: 6px;
          }
          .historical p {
            line-height: 16px;
          }
          .main,
          .entry,
          .effect {
            text-align: left;
            padding: 0 5px;
            .desc-title {
              color: #ddbb69;
            }
          }
        }
        .name {
          text-align: center;
        }
        .main {
          width: 100%;
          font-size: 12px;
          position: relative;
          p {
            padding: 2px 0;
          }
        }
      }
    }
    .pop {
      background-color: #2a2522;
      color: #958e7e;
      /deep/.van-popup__close-icon {
        color: #dec98a;
      }
      .title {
        padding: 18px;
        color: #dec98a;
        font-weight: bold;
        text-align: center;
        position: relative;
        &::after {
          position: absolute;
          bottom: 0;
          left: 0;
          content: '';
          width: 80%;
          left: 10%;
          height: 1px;
          background-image: linear-gradient(
            -90deg,
            #2a2522 0%,
            #eedca5 15%,
            #dec98a 20%,
            #f3ce60 50%,
            #dec98a 80%,
            #eedca5 85%,
            #2a2522 100%
          );
        }
      }
      .formpop {
        margin-top: 20px;
        .cw-btn {
          color: #ddbb69;
        }
      }
      /deep/.bc .van-cell__value .van-field__control {
        color: #ddbb69;
      }
      /deep/.tbc .van-cell__value .van-field__body {
        border: none;
        background-color: #2a2522;
      }
      /deep/ .van-cell__value .van-field__body {
        padding: 2px 5px;
        border-radius: 6px;
        font-size: 12px;
        border: 1px solid #888;
        background-color: #3a352f;
      }
      /deep/ .van-cell__value .van-field__control,
      /deep/ .van-cell__value .van-field__word-limit {
        color: #a29fa3;
      }
      /deep/ .van-cell__title {
        font-size: 12px;
        padding: 0;
        font-weight: bold;
        color: #cdccca;
      }
      /deep/ .van-field {
        padding: 5px;
        background-color: #2a2522;
      }
      /deep/ .van-field::after {
        border: none;
      }
      .canWrite {
        display: grid;
        grid-template-columns: 10fr 1fr;
        font-size: 12px;
        justify-content: center;
        align-items: center;
      }
      .form-btn {
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        float: right;
        padding: 10px;
        .btn-item {
          width: 130px;
          height: 35px;
          background-color: #e1c78e;
          color: #2a2522;
          &:first-child {
            color: #2a2522;
          }
        }
      }
    }
  }
}
</style>
