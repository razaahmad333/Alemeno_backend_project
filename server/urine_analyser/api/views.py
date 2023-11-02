import cv2
import numpy as np
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status


class UrineStripUpload(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, format=None):
        image = request.data.get('image')

        if image:
            try:
                img = cv2.imdecode(np.fromstring(image.read(), np.uint8), cv2.IMREAD_COLOR)

                colors = extract_colors_from_strip(img)

                return Response({'colors': colors}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({'error': 'No image file provided'}, status=status.HTTP_400_BAD_REQUEST)
        
def extract_colors_from_strip(img):
    x_start = 150 
    y_start = 30
    spacing = 40
    box_size = 60  

    colors = []

    while y_start < img.shape[0] and len(colors) < 10:
        x_center = x_start + box_size // 2
        y_center = y_start + box_size // 2
        color = img[y_center, x_center]

        color_rgb = (color[2], color[1], color[0])
        colors.append(color_rgb)

        y_start += (box_size + spacing)

    return colors



A B C

W W R

100 doors in row

initially all doors are closed 

