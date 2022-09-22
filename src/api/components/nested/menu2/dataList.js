import requset from '@/utils/request'

export function queryDataList (curId) {
    return requset ({
        url:`/admin/userInfoSet/req?curId=${uid}`
    })
}