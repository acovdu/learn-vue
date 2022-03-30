//使用ES6 导入 jQuery
import $ from 'jquery'
import './css/index.css'

$(function () {
    console.log('xxxxx')
    //odd 奇数，even 偶数 0是偶数
    $('li:odd').css('background-color', 'red')
    $('li:even').css('background-color', 'cyan')
})