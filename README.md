CityHealth
======

> 保健店铺管理微信小程序

## Overview

### 1. 主要功能
- 店铺管理  
附近店铺列表、查找、收藏、发布店铺  
- 我的信息  
收藏列表、我的店铺、我的卡券、 ...  

### 2. 技术内容
微信小程序 ( wxml / wxss / js )

#### 2.1 UI开发
- 界面实现基于Flexbox的布局  
- 星级评价组件的定制  
components/ratestar.wxml  
components/ratestar.wxss  
components/ratestar.js
- 实现了列表的滑动删除  
```xml
<view class="nav-items">
  <block wx:for="{{shops}}" wx:for-item="shop" wx:key="">
    <view class="slide-item bottom-border flex-row {{shop.isExpended ? 'touch-move-active' : ''}}">
      <!-- 滑动前景 -->
      <view class="slide-front">
        <view class="nav-item">
          <navigator url="../shop/shop?id={{shop.id}}" class="flex-row flex-rest-width">
            <!-- 基础信息 -->
            <template is="shoplistitem" data="{{...shop}}" />
          </navigator>

          <!-- 更多 -->
          <view class="nav-item-tail flex-row flex-center" hover-stop-propagation="true" data-index="{{index}}"
                bindtap="onButMore" bindtouchstart="onMoreTouchStart" bindtouchend="onMoreTouchEnd">
            <image src="../../res/images/but_3dots.png"></image>
          </view>
        </view>
      </view>

      <!-- 滑动背景 -->
      <view class="slide-back flex-row">
        <button class="but-transparent flex-row flex-center" data-index="{{index}}"
                bindtap="onButDelete" bindtouchstart="onMoreTouchStart" bindtouchend="onMoreTouchEnd"
        >取消收藏</button>
      </view>
    </view>
  </block>
</view>
```

#### 2.2 功能实现
- 每个对象的class做为Model  
  - 用户 (User.js)
  - 店铺 (Shop.js)
  - 图片(Image.js)

## Need to Improve
- 补充完善功能 