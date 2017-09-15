import './components/barDom';
import './components/httpRequest';
import './components/dataFormat';

$(function(){
    $('.page-off').show();
    // $("input").attr("disabled",true);
    // $("select").attr("disabled","disabled");
})
// $('.page-compile').click(function(){
//     $('input').attr("disabled",false);
//     $("select").attr("disabled",false);
// });
$(function(){
    var customerId = window.localStorage.getItem('customerUUID');
    var token = window.localStorage.getItem('utClinic');
    var uuid = window.localStorage.getItem('uidClinic');
    var reqUrl = 'questionnaire/'+customerId+'/latest';
    $.ajax({
        url:window.urlHandler(reqUrl,uuid,token),
        type: 'POST',
        dataType: 'json',
        success:function(data) {
            if (data.status == 200) {
                bin(data.datas);
                var data = data.datas;
                if (data.exist == false) {
                    $('.ages').val(data.age);   //年龄
                    $('.height').val(data.height);  //身高
                    $('.phone1').val(data.contactInfo1);  //手机1
                    $('.registrationNum').text(data.registrationNum); //患者注册号
                    $('.names').val(data.patientName);   //姓名
                    $('.weight').val(data.weight);   //途中

                    var next_time = window.localStorage.getItem('next_time');
                    $('.a-data').text(next_time);  //测试日期

                    $('.a-hospital').text(data.mechanism);  //临床医院
                    //性别
                    if(data.sex==1){
                        $("#male").attr('checked',true);
                    }else if(data.sex==2){
                        $("#female").attr('checked',true);
                    }
                }else{
                    $('.ages').val(data.age);   //年龄
                    $('.height').val(data.height);  //身高
                    $('.phone1').val(data.contactInfo1);  //手机1
                    $('.registrationNum').text(data.registrationNum); //患者注册号
                    $('.names').val(data.patientName);   //姓名
                    $('.weight').val(data.weight);   //途中
                    var next_time = window.localStorage.getItem('next_time');
                    $('.a-data').text(next_time);  //测试日期
                    $('.a-hospital').text(data.mechanism);  //临床医院
                    //性别
                    if(data.sex==1){
                        $("#male").attr('checked',true);
                    }else if(data.sex==2){
                        $("#female").attr('checked',true);
                    }
                    // 知情同意书
                    if(data.signConsent==1){
                        $('#yes').attr('checked',true);
                    }else if(data.signConsent==2){
                        $('#no').attr('checked',true);
                    }
                    $('.form-control14').val(data.exercisePrescription).trigger('change');
                    $('.form-control13').val(data.diabeticHistory).trigger('change');
                    $('.form-control17').val(data.smokingHistory).trigger('change');
                    $('.form-control18').val(data.movementSituation).trigger('change');
                    $('.form-control19').val(data.sleepQuality).trigger('change');
                    $('.form-control20').val(data.dietSituation).trigger('change');
                    //是否注射胰岛素
                    if(data.isInjectingInsulin==1){
                        $('#male2').attr('checked',true);
                    }else if(data.isInjectingInsulin==2){
                        $('#female2').attr('checked',true);
                    }

                    $('.select3').select2({}); //ok
                    var dataArr3 = data.familyHistory.split(',');
                    $('.select3').val(dataArr3).trigger('change');

                    $('.select5').select2({});  //ok
                    var dataArr5 = data.oralMedicine.split(',');
                    $('.select5').val(dataArr5).trigger('change');


                    $('.select4').select2({});
                    var dataArr4 = data.symptomSign.split(',');
                    $('.select4').val(dataArr4).trigger('change');

                    $('.select6').select2({});
                    var dataArr6 = data.diabeticComplication.split(',');
                    $('.select6').val(dataArr6).trigger('change');

                    $('.diseases').select2({});
                    var diseases = data.medicalHistory.split(',');
                    $('.diseases').val(diseases).trigger('change');

                    $('.form-control2').val(data.testPhase).trigger('change');
                    $('.form-control3').val(data.sectionType).trigger('change');
                    $('.form-control4').val(data.profession).trigger('change');
                    new GetData();
                }
            }
        },
        error:function(){
            swal({
                title: '保存失败，请核查填入内容！',
                type: 'info',
                showConfirmButton: true,
                confirmButtonText: '确定',
                timer: 2000,
                confirmButtonColor: '#009CAA'
            });
        }
    })
})

function bin(data){
    var height = (data.height/100).toFixed(2);
    var weight = data.weight;
    var bmi = ((weight/height)/height).toFixed(1);
    $('.bmi').text(bmi);
}

function GetData(){
    this.dataArr1 = [];
    this.dataArr2 = [];
    this.dataArr4 = [];
    this.dataArr5 = [];
    this.dataArr6 = [];
    this.dataArr7 = [];
    this.bind();
}
GetData.prototype = {
    bind:function(){
        var _this = this;
        $('.select1').on('change',function(){
            _this.dataArr1 = [];
            var a = $('.select1').select2('data');
            if(a.length!=0){
                if(a[0].id==1&&a.length>1){
                    a.shift();
                    $('.select1').val(a).trigger('change');
                }
            }

            for(var key in a){
                _this.dataArr1.push(parseInt(a[key].id));
            }
        });
        $('.select3').on('change',function(){
            var a = $('.select3').select2('data');
            _this.dataArr2 = [];
            if(a.length!=0){
                if(a[0].id==1&&a.length>1){
                    a.shift();
                    $('.select3').val(a).trigger('change');
                }
            }
            for(var key in a){
                _this.dataArr2.push(parseInt(a[key].id));
            }
        });
        $(".select4").on('change',function(){
            var a =  $('.select4').select2('data');
            _this.dataArr4 = [];
            if(a.length!=0){
                if(a[0].id==1&&a.length>1){
                    a.shift();
                    $('.select4').val(a).trigger('change');
                }
            }
            for(var key in a){
                _this.dataArr4.push(parseInt(a[key].id));
            }
        });
        $(".select5").on('change',function(){
            var a =  $('.select5').select2('data');
            _this.dataArr5 = [];
            if(a.length!=0){
                if(a[0].id==1&&a.length>1){
                    a.shift();
                    $('.select5').val(a).trigger('change');
                }
            }
            for(var key in a){
                _this.dataArr5.push(parseInt(a[key].id));
            }
        });
        $(".select6").on('change',function(){
            var a =  $('.select6').select2('data');
            _this.dataArr6 = [];
            if(a.length!=0){
                if(a[0].id==1&&a.length>1){
                    a.shift();
                    $('.select6').val(a).trigger('change');
                }
            }
            for(var key in a){
                _this.dataArr6.push(parseInt(a[key].id));
            }
        });
        $(".diseases").on('change',function(){
            var a = $('.diseases').select2('data');
            _this.dataArr7 = [];
            if(a.length!=0){
                if(a[0].id==1&&a.length>1){
                    a.shift();
                    $('.diseases').val(a).trigger('change');
                }
            }
            for(var key in a){
                _this.dataArr7.push(parseInt(a[key].id));
            }
        })
        $('.page-save').on('click',function(){
            _this.submitResult();
            //  verify();
            checkPhone();
            checkPhone2();
            ages();
            weightS();
            restingS();
            glucose();
            heightS();
            compressionS();
            shrinkageS();
            capacityS();
            commentS();
            glucose_queen();
        })
        $(".form-control1").select2({
            placeholder: "点击选择",
            allowClear: true,
            minimumResultsForSearch: -1,
            language: 'zh-CN'
        });
        $(".form-control2").select2({
            placeholder: "点击选择",
            allowClear: true,
            minimumResultsForSearch: -1,
            language: 'zh-CN'
        });
        $(".form-control3").select2({
            placeholder: "点击选择",
            allowClear: true,
            minimumResultsForSearch: -1,
            language: 'zh-CN'
        });
        $(".form-control4").select2({
            placeholder: "点击选择",
            allowClear: true,
            minimumResultsForSearch: -1,
            language: 'zh-CN'
        });
        $(".form-control5").select2({
            placeholder: "点击选择",
            allowClear: true,
            minimumResultsForSearch: -1,
            language: 'zh-CN'
        });
        $(".form-control6").select2({
            placeholder: "点击选择",
            allowClear: true,
            minimumResultsForSearch: -1,
            language: 'zh-CN'
        });
        $(".form-control7").select2({
            placeholder: "点击选择",
            allowClear: true,
            minimumResultsForSearch: -1,
            language: 'zh-CN'
        });
        $(".form-control8").select2({
            placeholder: "点击选择",
            allowClear: true,
            minimumResultsForSearch: -1,
            language: 'zh-CN'
        });
        $(".form-control9").select2({
            placeholder: "点击选择",
            allowClear: true,
            minimumResultsForSearch: -1,
            language: 'zh-CN'
        });
        $(".form-control10").select2({
            placeholder: "点击选择",
            allowClear: true,
            minimumResultsForSearch: -1,
            language: 'zh-CN'
        });
        $(".form-control11").select2({
            placeholder: "点击选择",
            allowClear: true,
            minimumResultsForSearch: -1,
            language: 'zh-CN'
        });
        $(".form-control12").select2({
            placeholder: "点击选择",
            allowClear: true,
            minimumResultsForSearch: -1,
            language: 'zh-CN'
        });
        $(".form-control13").select2({
            placeholder: "点击选择",
            allowClear: true,
            minimumResultsForSearch: -1,
            language: 'zh-CN'
        });
        $(".form-control14").select2({
            placeholder: "点击选择",
            allowClear: true,
            minimumResultsForSearch: -1,
            language: 'zh-CN'
        });
        $(".form-control15").select2({
            placeholder: "点击选择",
            allowClear: true,
            minimumResultsForSearch: -1,
            language: 'zh-CN'
        });
        $(".form-control16").select2({
            placeholder: "点击选择",
            allowClear: true,
            minimumResultsForSearch: -1,
            language: 'zh-CN'
        });
        $(".form-control17").select2({
            placeholder: "点击选择",
            allowClear: true,
            minimumResultsForSearch: -1,
            language: 'zh-CN'
        });
        $(".form-control18").select2({
            placeholder: "点击选择",
            allowClear: true,
            minimumResultsForSearch: -1,
            language: 'zh-CN'
        });
        $(".form-control19").select2({
            placeholder: "点击选择",
            allowClear: true,
            minimumResultsForSearch: -1,
            language: 'zh-CN'
        });
        $(".form-control20").select2({
            placeholder: "点击选择",
            allowClear: true,
            minimumResultsForSearch: -1,
            language: 'zh-CN'
        });
        $(".form-control21").select2({
            placeholder: "点击选择",
            allowClear: true,
            minimumResultsForSearch: -1,
            language: 'zh-CN'
        });
        $(".form-control22").select2({
            placeholder: "点击选择",
            allowClear: true,
            minimumResultsForSearch: -1,
            language: 'zh-CN'
        });
        $(".page-compile").click(function(){
            $(this).css({
                "background":"#00A6B4",
                "color":"#fff"
            });
            $(".page-off").show();
            $(".page-btn").hide();
        })
        $(".page-call").click(function(){
            window.history.go(-1);
        })
    },
    submitResult:function() {
        var hospital = $(".a-hospital").val();  //临床医院
        var StartData = $('.a-data').text();  //测试时间
        var registrationNum = $('.registrationNum').text();    //患者注册号
        var form_control = $('.form-control2 option:selected').val();         //测试阶段
        var form_control3 = $('.form-control3 option:selected').val();  //科组分类
        var names = $('.names').val();                  //患者名称
        var sex = $("input[name='sex']:checked").val(); //性别
        var agree = $("input[name='agree']:checked").val(); //是否已签署知情同意书
        var select2_selection = $('.select2-selection option:selected').val(); //职业
        var phone1 = $(".phone1").val();  //必填手机
        var ages = $(".ages").val();    //年龄
        var phone = $('.phone').val();  //选填手机
        var resting = $('.resting').val(); // 静息心率
        var weight = $('.weight').val();  //体重
        var blood_glucose = $('.blood-glucose').val(); //运动前血糖
        var blood_glucose_queen = $('.blood_glucose_queen').val(); //运动后血糖
        var height = $('.height').val();   //身高
        var compression = $('.compression').val();   //收压缩
        var shrinkage = $('.shrinkage').val();  //舒张缩
        var bmi_index = $('.bmi').text(); //BMI指数
        var laboratory1 = $('.laboratory1 option:selected').val(); //糖化红血白
        var laboratory2 = $('.laboratory2 option:selected').val(); //甘油三脂
        var laboratory3 = $('.laboratory3 option:selected').val(); //总胆固醇水平
        var laboratory4 = $('.laboratory4 option:selected').val(); //高密度脂蛋白胆固醇水平

        var par_result = this.dataArr1;                //PAR-Q结果(多选)
        var par_resultA = par_result.join(",");

        var diseases = this.dataArr7;                   //疾病史
        var diseasesA = diseases.join(",");

        var test_scheme = $('.test_scheme option:selected').val(); //测试方案
        var capacity = $('.capacity').val();   //有氧能力
        var diabetes_history = $('.diabetes-history option:selected').val(); //糖尿病史
        var prescription = $('.prescription option:selected').val();  //运动处方
        var familyHistory = this.dataArr2;         //家族史
        var familyHistoryB = familyHistory.join(",");
        var symptomSign = this.dataArr4;       //症状与体征
        var symptomSignC = symptomSign.join(",");
        var smokingHistory = $('.smokingHistory option:selected').val(); //吸烟史
        var movementSituation = $('.movementSituation option:selected').val(); //运动情况
        var sleepQuality = $('.sleepQuality option:selected').val(); //睡眠情况
        var dietSituation = $('.dietSituation option:selected').val(); //饮食情况
        var oralMedicine = this.dataArr5;   //口服药 多选
        var oralMedicineD = oralMedicine.join(",");
        var isInjectingInsulin = $("input[name='insulin']:checked").val(); //是否注射胰岛素
        var diabeticComplication = this.dataArr6;   //并发症(多选)
        var diabeticComplicationE = diabeticComplication.join(",");
        var comment = $('.comment').val();        //备注

        var reportType1 = window.localStorage.getItem("reportType1");
        var token = window.localStorage.getItem('utClinic');
        var uuid = window.localStorage.getItem('uidClinic');
        var reqUrl = 'questionnaire/save';
        var sendData = {
            reportId: window.localStorage.getItem('reportId'),
            reportType: reportType1,
            mechanism: hospital,
            testDate: StartData,
            registrationNum: registrationNum,
            testPhase: form_control,
            sectionType: form_control3,
            patientName: names,
            contactInfo1: phone1,
            contactInfo2: phone,
            profession: select2_selection,
            sex: sex,
            age: ages,
            height: height,
            weight: weight,
            bmiIndex:bmi_index,
            restingHeartRate: resting,
            systolicPressure: compression,
            diastolicPressure: shrinkage,
            glu: blood_glucose,
            afterSportGlu:blood_glucose_queen,
            hba1c: laboratory1,
            triglyceride: laboratory2,
            totalCholesterolLevel: laboratory3,
            hdlcLevel: laboratory4,
            parqResult: par_resultA,
            testPlan: test_scheme,
            metValue: capacity,
            exercisePrescription: prescription,
            diabeticHistory: diabetes_history,
            familyHistory: familyHistoryB,
            medicalHistory: diseasesA,
            symptomSign: symptomSignC,
            smokingHistory: smokingHistory,
            sleepQuality: sleepQuality,
            movementSituation: movementSituation,
            dietSituation: dietSituation,
            isInjectingInsulin: isInjectingInsulin,
            oralMedicine: oralMedicineD,
            diabeticComplication: diabeticComplicationE,
            remark: comment,
            signConsent:agree
        };
        if(names == '' || phone1 == '' || ages == '' || resting == '' || weight == '' ||
            blood_glucose == '' || height == '' || compression == '' ||shrinkage == '' ||
            par_result == ''||capacity == '' || familyHistory == '' || symptomSign == '' ||
            oralMedicine == '' ||diabeticComplication == ''||blood_glucose_queen==''||dietSituation==''||sleepQuality==''
            ||movementSituation==''||smokingHistory==''||symptomSignC==''||familyHistoryB==''||diseasesA==''||par_resultA==''||
            form_control3==''||agree==''||sex==''||isInjectingInsulin==''){
            swal({
                title: '带星是必填的！',
                type: 'info',
                showConfirmButton: true,
                confirmButtonText: '确定',
                timer: 2000,
                confirmButtonColor: '#009CAA'
            })
        }else {
            $.ajax({
                type: 'POST',
                url: window.urlHandler(reqUrl, uuid, token),
                dataType: 'json',
                data: JSON.stringify(sendData),
                contentType: 'application/json',
                success: function (data) {
                    if (data.status == 200) {
                        swal({
                            title: '保存成功！',
                            type: 'success',
                            showConfirmButton: true,
                            confirmButtonText: '确定',
                            timer: 2000,
                            confirmButtonColor: '#009CAA'
                        });
                        var recordId = data.datas;
                        window.localStorage.setItem('data_recordId',recordId);
                        setTimeout(function(){
                            window.history.go(-1);
                        },2000)

                    } else {
                        swal({
                            title: '保存失败，请核查填入内容！',
                            type: 'info',
                            showConfirmButton: true,
                            confirmButtonText: '确定',
                            timer: 2000,
                            confirmButtonColor: '#009CAA'
                        });
                    }

                },
                error:function(){
                    swal({
                        title: '保存失败，请核查填入内容！',
                        type: 'info',
                        showConfirmButton: true,
                        confirmButtonText: '确定',
                        timer: 2000,
                        confirmButtonColor: '#009CAA'
                    });
                }
            })
        }
    }
};
new GetData();

var next_time = window.localStorage.getItem('next_time');
$('.questionnaire-data').find('p').text(window.formatTime2(new Date()));


$('.names').blur(patient_name);
function patient_name(){
    var names = $('.names').val();
    if(names==''){
        $('.hint-14').show().text("信息不能为空");
    }else if(!(/^([A-Za-z]|[\u4E00-\u9FA5])+$/).test(names)){
        $('.hint-14').show().text("请输入汉字或字母");
    }else if(names.length>10){
        $('.hint-14').show().text("长度不能大于10位");
    }else{
        $('.hint-14').hide();
    }
}
//手机2验证
$('.phone').blur(checkPhone);
function checkPhone(){
    var phone = $('.phone').val();
    if(phone==""){
        $(".hint-2").hide();
        return true;
    }else if(!(/^1[34578]\d{9}$/.test(phone))){
        $(".hint-2").show().text("请输入正确格式");
        return false;
    }else{
        $('.hint-2').hide();
        return true;
    }
}
//手机1验证
$(".phone1").blur(checkPhone2);
function checkPhone2(){
    var phone1 = $('.phone1').val();
    if(phone1==""){
        $(".hint-3").show().text("信息不能为空");
    }else if(!(/^1[34578]\d{9}$/.test(phone1))){
        $(".hint-3").show().text("请输入正确格式");
    }else{
        $(".hint-3").hide();
        return true;
    }
}
//年龄
$(".ages").blur(ages);
function ages(){
    var age = $('.ages').val();
    if(age==""){
        $(".hint-4").show().text("信息不能为空");
    }else if(!(/^[0-9]+$/).test(age)){
        $(".hint-4").show().text("请输入正确格式");
    }else if(age<18||age>70){
        $(".hint-4").show().text("请输入18~70范围内");
    }
    else{
        $(".hint-4").hide();
        return true;
    }
}
//静息心率
$(".resting").blur(restingS);
function restingS(){
    var resting = $('.resting').val();
    if(resting==""){
        $(".hint-5").show().text("信息不能为空");
    }else if(!(/^[0-9]+$/).test(resting)){
        $(".hint-5").show().text("请输入正确格式");
    }else if(resting<0||resting>999){
        $(".hint-5").show().text("请输入0~999范围内");
    }
    else{
        $('.hint-5').hide();
    }
}
//体重
$('.weight').blur(weightS);
function weightS(){
    var weight = $('.weight').val();
    if(weight==""){
        $('.hint-6').show().text("信息不能为空");
    }else if(!(/^[0-9]+$/).test(weight)){
        $(".hint-6").show().text("输入的格式不对");
    }else if(weight<35||weight>125){
        $(".hint-6").show().text("请输入35~125范围内");
    }else{
        $(".hint-6").hide();
        return true;
    }
}
//运动前血糖
$('.blood-glucose').blur(glucose);
function glucose(){
    var blood_glucose = $('.blood-glucose').val();
    if(blood_glucose==""){
        $(".hint-7").show().text("信息不能为空");
    }else if(!(/^\d+(\.\d{1,2})?$/.test(blood_glucose))){
        $(".hint-7").show().text("输入的格式不对");
    }else if(blood_glucose>=100){
        $(".hint-7").show().text("请输入100以内范围");
    }
    else{
        $('.hint-7').hide();
    }
}
////运动后血糖
$('.blood_glucose_queen').blur(glucose_queen);
function glucose_queen(){
    var blood_glucose_queen = $('.blood_glucose_queen').val();
    if(blood_glucose_queen==""){
        $(".hint-77").show().text("信息不能为空");
    }else if(!(/^\d+(\.\d{1,2})?$/.test(blood_glucose_queen))){
        $(".hint-77").show().text("输入的格式不对");
    }else if(blood_glucose_queen>=100){
        $(".hint-77").show().text("请输入100以内范围");
    }
    else{
        $('.hint-77').hide();
    }
}

//身高
$(".height").blur(heightS);
function heightS(){
    var height = $('.height').val();
    if(height==""){
        $('.hint-8').show().text("信息不能为空");
    }else if(!(/^[1-2]\d{2}$/.test(height))){
        $(".hint-8").show().text("请输入正确的格式");
    }else{
        $('.hint-8').hide();
    }
}
//收压缩
$(".compression").blur(compressionS);
function compressionS(){
    var compression = $('.compression').val();
    if(compression==""){
        $(".hint-9").show().text("信息不能为空");
    }else if(!(/^[0-9]+$/).test(compression)){
        $(".hint-9").show().text("请输入正确的格式");
    }else if(compression<0||compression>999){
        $('.hint-9').show().text("请输入0~999范围内");
    }else{
        $('.hint-9').hide();
    }
}
//舒张缩
$(".shrinkage").blur(shrinkageS);
function shrinkageS(){
    var shrinkage = $('.shrinkage').val();
    if(shrinkage==""){
        $('.hint-11').show().text("信息不能为空");
    }else if(!(/^[0-9]+$/).test(shrinkage)){
        $(".hint-11").show().text("请输入正确的格式");
        return false;
    }else if(shrinkage<0||shrinkage>999){
        $(".hint-11").show();
        $('.hint-11').show().text("请输入0~999范围内");
    }else{
        $('.hint-11').hide();
        return true;
    }
}
//有氧能力
$(".capacity").blur(capacityS);
function capacityS(){
    var capacity =$('.capacity').val();
    if(capacity==""){
        $('.hint-12').show().text('信息不能为空')
    }else if(!(/^[1-9]\d*([.][1-9])?$/.test(capacity))){
        $(".hint-12").show().text("请输入正确的格式");
        return false;
    }else if(capacity>100){
        $('.hint-12').show().text('请输入100范围内数值')
    }
    else{
        $('.hint-12').hide();
        return true;
    }
}
$('.comment').blur(commentS);
function commentS() {
    var comment = $('.comment').val();
    if (comment == "") {
        $(".hint-13").hide();
        return true;
    }else if (comment.length > 200) {
        $('.hint-13').show().text("仅限200字以内");
    }
    else {
        $('.hint-13').hide();
        return true;
    }
}
