"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.externalAuthorizeRequest = void 0;
const api_jetlexa_1 = __importDefault(require("../../clients/api.jetlexa"));
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const index_errors_1 = __importDefault(require("../../error/api-errors/index.errors"));
const externalAuthorizeRequest = async (req, res, next) => {
    var _a, _b, _c, _d, _e, _f, _g;
    try {
        if ((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) {
            api_jetlexa_1.default.defaults.headers.common.Authorization = req.headers.authorization;
        }
        if ((_b = req.query) === null || _b === void 0 ? void 0 : _b.accessKey) {
            api_jetlexa_1.default.defaults.headers.common.Authorization = "Bearer " + ((_c = req.query) === null || _c === void 0 ? void 0 : _c.accessKey);
        }
        if (!((_d = req === null || req === void 0 ? void 0 : req.headers) === null || _d === void 0 ? void 0 : _d.authorization) && !((_e = req.query) === null || _e === void 0 ? void 0 : _e.accessKey)) {
            throw new Error("Authorization header not found");
        }
        const response = await api_jetlexa_1.default.post('/cdn/ext/authorize', {}, {
            headers: {
                'Content-Type': 'application/json'
                //'Authorization': `${req.headers.authorization}`
            }
        }).then((response) => {
            console.log('RESP@@@@@@', response.data);
            return response;
        }).catch((error) => {
            console.log('ERROR@@@@@', error);
            throw error;
        });
        req.user = (_g = (_f = response === null || response === void 0 ? void 0 : response.data) === null || _f === void 0 ? void 0 : _f.node) === null || _g === void 0 ? void 0 : _g.user;
        req.jetlexaApi = api_jetlexa_1.default;
        next();
    }
    catch (error) {
        //next();
        throw new ApiError_1.default(index_errors_1.default.UNAUTHORIZED);
    }
};
exports.externalAuthorizeRequest = externalAuthorizeRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZXJuYWwuYXV0aG9yaXphdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9taWRkbGV3YXJlcy9BdXRob3JpemF0aW9uL2V4dGVybmFsLmF1dGhvcml6YXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsdUVBQTJDO0FBQzNDLCtEQUF1QztBQUN2QyxrRkFBMkQ7QUFHcEQsTUFBTSx3QkFBd0IsR0FBZ0MsS0FBSyxFQUFFLEdBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7O0lBQy9GLElBQUk7UUFDQSxJQUFJLE1BQUEsR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLE9BQU8sMENBQUUsYUFBYSxFQUFFO1lBQzdCLHFCQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1NBQzdFO1FBQ0QsSUFBSSxNQUFBLEdBQUcsQ0FBQyxLQUFLLDBDQUFFLFNBQVMsRUFBRTtZQUN0QixxQkFBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsR0FBRyxTQUFTLElBQUcsTUFBQSxHQUFHLENBQUMsS0FBSywwQ0FBRSxTQUFTLENBQUEsQ0FBQztTQUNwRjtRQUVELElBQUksQ0FBQyxDQUFBLE1BQUEsR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLE9BQU8sMENBQUUsYUFBYSxDQUFBLElBQUksQ0FBQyxDQUFBLE1BQUEsR0FBRyxDQUFDLEtBQUssMENBQUUsU0FBUyxDQUFBLEVBQUU7WUFDdkQsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1NBQ3JEO1FBRUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxxQkFBTyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLEVBQUU7WUFDMUQsT0FBTyxFQUFFO2dCQUNMLGNBQWMsRUFBRSxrQkFBa0I7Z0JBQ2xDLGlEQUFpRDthQUNwRDtTQUNKLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekMsT0FBTyxRQUFRLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNqQyxNQUFNLEtBQUssQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztRQUNILEdBQUcsQ0FBQyxJQUFJLEdBQUcsTUFBQSxNQUFBLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxJQUFJLDBDQUFFLElBQUksMENBQUUsSUFBSSxDQUFDO1FBQ3RDLEdBQUcsQ0FBQyxVQUFVLEdBQUcscUJBQU8sQ0FBQztRQUN6QixJQUFJLEVBQUUsQ0FBQztLQUNWO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDWixTQUFTO1FBQ1QsTUFBTSxJQUFJLGtCQUFRLENBQUMsc0JBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNsRDtBQUNMLENBQUMsQ0FBQTtBQWhDWSxRQUFBLHdCQUF3Qiw0QkFnQ3BDIn0=