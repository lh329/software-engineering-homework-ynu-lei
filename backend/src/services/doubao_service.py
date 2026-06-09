import os
import requests
from dotenv import load_dotenv

load_dotenv()

DOUBAO_API_KEY = os.getenv("DOUBAO_API_KEY")
DOUBAO_API_URL = os.getenv("DOUBAO_API_URL", "https://ark.cn-beijing.volces.com/api/v3/responses")
DOUBAO_MODEL = os.getenv("DOUBAO_MODEL", "doubao-seed-2-0-mini-260428")

def call_doubao_api(prompt: str) -> str:
    headers = {
        "Authorization": f"Bearer {DOUBAO_API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": DOUBAO_MODEL,
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ]
    }
    
    try:
        # 使用 OpenAI 兼容的 API 端点
        api_url = "https://ark.cn-beijing.volces.com/api/v3/chat/completions"
        response = requests.post(api_url, headers=headers, json=payload, timeout=30)
        response.raise_for_status()
        data = response.json()
        
        # 打印响应结构用于调试
        print(f"API响应结构: {data.keys()}")
        
        if "choices" in data and len(data["choices"]) > 0:
            return data["choices"][0]["message"]["content"]
        else:
            print(f"完整响应: {data}")
            return "API返回格式异常"
    except Exception as e:
        print(f"API调用异常: {str(e)}")
        return f"调用失败: {str(e)}"

def optimize_resume_section(content: str, section: str) -> str:
    prompt = f"""
请优化以下简历{section}内容，使其更专业、更具吸引力。

原始内容：
{content}

优化要求：
1. 使用专业术语，突出量化成果
2. 使用主动语态和动词开头
3. 保持原意，不添加虚假信息
4. 适当使用行业关键词
5. 语言流畅自然，适合简历使用

请直接返回优化后的内容，不要包含任何额外说明或解释。
"""
    result = call_doubao_api(prompt)
    return clean_result(result)

def analyze_jd(jd_text: str) -> str:
    prompt = f"""
请分析以下职位描述（JD），提取关键信息。

职位描述：
{jd_text}

请按照以下格式返回分析结果：
【职位名称】：
【公司行业】：
【必备技能】：
【加分技能】：
【岗位职责】：
【任职要求】：
"""
    return call_doubao_api(prompt)

def match_resume(resume_text: str, jd_text: str) -> str:
    prompt = f"""
请对比以下简历和职位描述（JD），进行匹配分析。

简历内容：
{resume_text}

职位描述：
{jd_text}

请按照以下格式返回分析结果：
【匹配分数】：（0-100分）
【匹配关键词】：
【缺失关键词】：
【改进建议】：
"""
    return call_doubao_api(prompt)

def generate_career_path(resume_text: str) -> str:
    prompt = f"""
请根据以下简历内容，提供职业发展建议。

简历内容：
{resume_text}

请按照以下格式返回分析结果：
【当前水平评估】：
【短期目标（1-2年）】：
【中期目标（3-5年）】：
【推荐学习技能】：
【发展路径建议】：
"""
    return call_doubao_api(prompt)

def generate_summary(resume_text: str) -> str:
    prompt = f"""
请根据以下简历内容，生成一个专业的个人简介。

简历内容：
{resume_text}

要求：
1. 突出核心竞争力和独特优势
2. 不超过150字
3. 专业但不生硬，适合放在简历顶部
4. 直接返回简介内容，不要包含额外说明
"""
    result = call_doubao_api(prompt)
    return clean_result(result)

def clean_result(result: str) -> str:
    """清理AI返回的结果，去除格式标记"""
    patterns = [
        r"^优化后的内容：\s*",
        r"^优化内容：\s*",
        r"^优化结果：\s*",
        r"^个人简介：\s*",
        r"^简介：\s*",
        r"^\s*-\s*",
        r"^\s*\*\s*",
        r"^\s*\d+\.\s*",
    ]
    
    import re
    cleaned = result.strip()
    for pattern in patterns:
        cleaned = re.sub(pattern, "", cleaned)
    
    return cleaned.strip()
